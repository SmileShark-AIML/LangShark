# 유저

LangShark는 모든 사용자에대한 Overview를 제공합니다. 또한 개별 사용자에 대한 디테일도 확인할 수 있습니다.

LangShark에서 개별 유저를 매핑하려면, 단순히 userId에 고유 식별자를 전달하기만 하면 됩니다.

이후 자동으로 트레이싱되며, UserId는 선택사항이지만 운영과정에 있어 많은것을 얻는데 도움이 됩니다.

### 예제

![](../.gitbook/assets/colab-badge.svg)

<table data-view="cards"><thead><tr><th></th><th></th><th></th><th data-hidden data-card-cover data-type="files"></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td></td><td>Python Decorator</td><td></td><td><a href="../.gitbook/assets/python(3).png">python(3).png</a></td><td><a href="https://colab.research.google.com/drive/18eaikKzYRpYEppQUY489yNq8XrAJR2ts?usp=sharing">https://colab.research.google.com/drive/18eaikKzYRpYEppQUY489yNq8XrAJR2ts?usp=sharing</a></td></tr><tr><td></td><td>LangChain</td><td></td><td><a href="../.gitbook/assets/1_MVJZLfszGGNiJ-UFK4U31A.png">1_MVJZLfszGGNiJ-UFK4U31A.png</a></td><td><a href="https://colab.research.google.com/drive/1zCmP30SoCDtQAHMuNLqGwaCCowWT2vJK?usp=sharing">https://colab.research.google.com/drive/1zCmP30SoCDtQAHMuNLqGwaCCowWT2vJK?usp=sharing</a></td></tr><tr><td></td><td>LlamaIndex (soon)</td><td></td><td><a href="../.gitbook/assets/eyecatch-llamdaindex.webp">eyecatch-llamdaindex.webp</a></td><td></td></tr></tbody></table>

{% tabs %}
{% tab title="Python Decorator" %}
```python
!pip install -q https://github.com/SmileShark-AIML/LangShark/raw/main/langshark-0.2.0-py3-none-any.whl
```

```python
import os

# Langshark 설정
os.environ["LANGSHARK_SECRET_KEY"] = "sk-lf-b24f1ed3-10a0-400d-9975-07047d16a028"
os.environ["LANGSHARK_PUBLIC_KEY"] = "pk-lf-d20eea6c-da94-45ac-9e18-548dee6f47ae"
os.environ["LANGSHARK_HOST"] = "https://langshark.smileshark.help"
```

```python
from langshark.decorators import observe, langshark_context
import requests
import json

@observe()
def generation():

    # 여기에 UserID를 매핑할 수 있습니다.
    langshark_context.update_current_trace(
        user_id="example_user"
    )

    api_key = "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"
    url = "https://api.groq.com/openai/v1/chat/completions"

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {api_key}"
    }

    data = {
        "model": "llama-3.1-70b-versatile",
        "messages": [
            {"role": "system", "content": "당신은 유용한 어시스턴트입니다. 한국어로 대답하세요."},
            {"role": "user", "content": "인공지능에 대해 간단히 설명해주세요."}
        ],
        "temperature": 1.0
    }

    response = requests.post(url, headers=headers, data=json.dumps(data))
    generated_text = response.json()['choices'][0]['message']['content']
    return generated_text

@observe()
def groq_invoke():
    return generation()

groq_invoke()
```
{% endtab %}

{% tab title="LangChain" %}
```python
!pip install -q https://github.com/SmileShark-AIML/LangShark/raw/main/langshark-0.2.0-py3-none-any.whl
```

```notebook-python
!pip install -q langchain langchain_groq
```

```python
import os

# Langshark 설정
os.environ["LANGSHARK_SECRET_KEY"] = "sk-lf-b24f1ed3-10a0-400d-9975-07047d16a028"
os.environ["LANGSHARK_PUBLIC_KEY"] = "pk-lf-d20eea6c-da94-45ac-9e18-548dee6f47ae"
os.environ["LANGSHARK_HOST"] = "https://langshark.smileshark.help"
```

```python
from langshark.callback import CallbackHandler

callback_handler = CallbackHandler(
    user_id="test-user-langchain"
)
```

```python
from langchain_groq import ChatGroq

groq = ChatGroq(
    model="llama-3.1-70b-versatile",
    temperature=0.0,
    max_retries=2,
    api_key="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",
    max_tokens=2000
)

question = "인공지능에 대해 설명해주세요"

response = groq.invoke(question, config={"callbacks":[callback_handler]}).content
```
{% endtab %}

{% tab title="LlamaIndex" %}
```ruby
soon
```
{% endtab %}
{% endtabs %}

### 결과물 확인

{% embed url="https://langshark.smileshark.help/project/cm0ukgugn0002tk69g52olded/traces/a0bfdc9d-866d-4690-9915-9cac7a926d49" %}

#### 트레이스 상세에 유저ID가 매핑된 것을 확인할 수 있습니다.

<figure><img src="../.gitbook/assets/image (13).png" alt=""><figcaption></figcaption></figure>

#### 유저 탭 이동시 유저별 조회도 가능합니다.

<figure><img src="../.gitbook/assets/image (14).png" alt=""><figcaption></figcaption></figure>

#### 유저 상세에서는 Overview, Trace등을 그룹으로 확인할 수 있습니다.

<figure><img src="../.gitbook/assets/image (15).png" alt=""><figcaption></figcaption></figure>

#### 이후 트레이스에서 UserID등을 조건값으로 확인할 수 있게 됩니다.

<figure><img src="../.gitbook/assets/image (16).png" alt=""><figcaption></figcaption></figure>
