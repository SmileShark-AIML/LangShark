# 프롬프트 관리

LangShark를 사용하면 프롬프트를 효과적으로 관리하고 버전화 할 수 있습니다.

LangShark의 프롬프트 기능은 프롬프트CMS(컨텐츠 관리 시스템)입니다.

### 왜 프롬프트 CMS를 사용해야 하나요?

프롬프트 관리란 LLM애플리케이션에서 프롬프트를 저장, 버전을 관리하고 검색하는 접근 방식입니다.

버전제어, 코드에서 프롬프트 분리, 프롬프트 모니터링, 로깅 및 최적화, 애플리케이션 및 기타 도구들과 통합하는것이 포함됩니다.

* 애플리케이션을 다시 배포하지 않고 새로운 프롬프트를 배포할 수 있습니다.
* 기술적인 지식이 없어도 LangShark 콘솔을 통해서 프롬프트를 만들고 업데이트 할 수 있습니다.
* 프롬프트를 이전 버전으로 롤백할 수 있습니다.

LangShark는 다음과 같은 이점이 있습니다.

* 클라이언트 측 캐싱 및 비동기 캐시 리프레시를 제공하기때문에 첫 사용 이후 지연시간에 영향이 없습니다.
* 텍스트 및 채팅 프롬프트(LangChain 템플릿 포함)을 제공합니다.
* SDK, 웹 콘솔 등에서 편집 및 관리가 가능합니다.

### 프롬프트 객체

LangShark의 프롬프트는 다음과 같은 오브젝트로 구성될 수 있습니다.

```json
{
  "name": "movie-critic",
  "type": "text",
  "prompt": "Do you like {{movie}}?",
  "config": {
    "model": "gpt-3.5-turbo",
    "temperature": 0.5,
    "supported_languages": ["en", "fr"]
  },
  "version": 1,
  "labels": ["production", "staging", "latest"],
  "tags": ["movies"]
}
```

* `name`: LangShark 프로젝트 내에서 프롬프트의 고유한 이름.
* `type`: 프롬프트 내용의 유형(`text` 또는 `chat`). 기본값은 `text`입니다.
* `prompt`: 변수가 포함된 텍스트 템플릿(예: `이것은 {{variable}}이 포함된 프롬프트입니다`). 채팅 프롬프트의 경우, 각각 `role`과 `content`를 가진 채팅 메시지 목록입니다.
* `config`: 모델 매개변수나 모델 도구와 같은 매개변수를 저장하기 위한 선택적 JSON 객체.
* `version`: 프롬프트의 버전을 나타내는 정수. 새 프롬프트 버전을 생성할 때 버전이 자동으로 증가합니다.
* `labels`: SDK에서 특정 프롬프트 버전을 가져오는 데 사용할 수 있는 레이블.
  * 레이블을 지정하지 않고 프롬프트를 사용할 때, LangShark는 `production` 레이블이 있는 버전을 제공합니다.
  * `latest`는 가장 최근에 생성된 버전을 가리킵니다.
  * 다른 환경(`staging`, `production`)이나 테넌트(`tenant-1`, `tenant-2`)를 위한 추가 레이블을 생성할 수 있습니다.

![](../.gitbook/assets/colab-badge.svg)

{% embed url="https://colab.research.google.com/drive/1AnvemJj6Kf6C5_8gzEbaEJHjj2wL2Grr?usp=sharing" %}

### 프롬프트 생성/업데이트

프롬프트 생성/업데이트는 콘솔 또는 Python SDK를 사용하여 진행할 수 있습니다.

{% tabs %}
{% tab title="LangShark 콘솔" %}
1.  프롬프트 메뉴로 이동하여 새 프롬프트를 생성합니다.

    <figure><img src="../.gitbook/assets/image (20).png" alt=""><figcaption></figcaption></figure>
2.  프롬프트를 입력하고 생성합니다.

    <figure><img src="../.gitbook/assets/image (21).png" alt=""><figcaption></figcaption></figure>
3.  프롬프트를 수정(개정)하려는 경우 새 버전을 생성합니다.

    <figure><img src="../.gitbook/assets/image (22).png" alt=""><figcaption></figcaption></figure>
4. 업데이트 진행시 새 버전이 발행됩니다.
{% endtab %}

{% tab title="Python" %}
```python
import os

os.environ["LANGFUSE_SECRET_KEY"] = "sk-lf-b24f1ed3-10a0-400d-9975-07047d16a028"
os.environ["LANGFUSE_PUBLIC_KEY"] = "pk-lf-d20eea6c-da94-45ac-9e18-548dee6f47ae"
os.environ["LANGFUSE_HOST"] = "https://langshark.smileshark.help"
```

텍스트 프롬프트는 다음과 같이 생성합니다.

```python
from langfuse import Langfuse

langfuse = Langfuse()

langfuse.create_prompt(
    name="movie-critic",
    type="text",
    prompt="너는 이 영화 좋아하니? 영화제목은 다음과 같아 : {{movie}}?",
    labels=["production"],  # directly promote to production
    config={
        "model": "llama-3.1-70b-versatile",
        "temperature": 1.0,
        "key": "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"
    },  
)
```

채팅 프롬프트는 다음과 같이 생성합니다.

```python
langfuse.create_prompt(
    name="movie-critic-chat",
    type="chat",
    prompt=[{"role": "system", "content": "너는 영화 비평가야. 그리고 이 영화에 대해 전문가야 : {{movie}}"}],
    labels=["production"],
    config={
        "model": "gpt-3.5-turbo",
        "temperature": 0.7,
        "key": "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"
    }
)
```
{% endtab %}
{% endtabs %}

### 프롬프트 사용

이제 LLM애플리케이션은 LangShark에서 프롬프트를 fetch 하여 사용할 수 있습니다.

{% tabs %}
{% tab title="Python" %}
```python
from langfuse import Langfuse

langfuse = Langfuse()

# text prompt
prompt = langfuse.get_prompt("movie-critic")
compiled_prompt = prompt.compile(movie="Dune 2")
compiled_prompt
```

```python
# chat prompt
chat_prompt = langfuse.get_prompt("movie-critic-chat")
compiled_chat_prompt = chat_prompt.compile(movie="Dune 2")
compiled_chat_prompt
```
{% endtab %}

{% tab title="LangChain" %}
```python
from langfuse import Langfuse
from langchain_core.prompts import ChatPromptTemplate

langfuse = Langfuse()

# text prompt

langfuse_prompt = langfuse.get_prompt("movie-critic")
langchain_prompt = ChatPromptTemplate.from_template(langfuse_prompt.get_langchain_prompt())
langchain_prompt
```

```python
# chat prompt
langfuse_prompt = langfuse.get_prompt("movie-critic-chat")
langchain_prompt = ChatPromptTemplate.from_messages(langfuse_prompt.get_langchain_prompt())
langchain_prompt
```
{% endtab %}
{% endtabs %}

다음과 같이 추가적인 파라미터 또한 적용할 수 있습니다.

```python
# 특정 버전 가져오기
prompt = langfuse.get_prompt("movie-critic", version=1)
 
# 특정 라벨 가져오기
prompt = langfuse.get_prompt("movie-critic", label="staging")
 
# 최신 프롬프트 가져오기
prompt = langfuse.get_prompt("movie-critic", label="latest")
```

### &#xD;
