# 세션

LLM애플리케이션에서의 상호작용은 수많은 트레이스에 걸쳐있게 됩니다. LangShark는 이런 추적을 그룹화하고 전체 상호작용에 대한 추적구성을 세션으로 확인할 수 있습니다.

트레이스를 생성하거나 업데이트 할때 sessionId만 추가하세요, 나머지는 LangShark가 자동으로 추적합니다.

sessionId는 세션을 식별하는데 사용할 수 있는 모든 문자열을 사용할 수 있습니다.

### 예제

![](../.gitbook/assets/colab-badge.svg)

<table data-view="cards"><thead><tr><th></th><th></th><th></th><th data-hidden data-card-cover data-type="files"></th></tr></thead><tbody><tr><td></td><td>Python Decorator</td><td></td><td><a href="../.gitbook/assets/python(3).png">python(3).png</a></td></tr><tr><td></td><td>LangChain</td><td></td><td><a href="../.gitbook/assets/1_MVJZLfszGGNiJ-UFK4U31A.png">1_MVJZLfszGGNiJ-UFK4U31A.png</a></td></tr><tr><td></td><td>LlamaIndex (soon)</td><td></td><td><a href="../.gitbook/assets/eyecatch-llamdaindex.webp">eyecatch-llamdaindex.webp</a></td></tr></tbody></table>

{% tabs %}
{% tab title="Python Decorator" %}
```python
pip install -q langfuse boto3
```

```python
import os

os.environ["LANGFUSE_SECRET_KEY"] = "sk-lf-b24f1ed3-10a0-400d-9975-07047d16a028"
os.environ["LANGFUSE_PUBLIC_KEY"] = "pk-lf-d20eea6c-da94-45ac-9e18-548dee6f47ae"
os.environ["LANGFUSE_HOST"] = "https://langshark.smileshark.help"
```

```python
from langfuse.decorators import observe, langfuse_context
import requests
import json

@observe()
def generation():

    # 여기세션을 추가할 수 있습니다.
    langfuse_context.update_current_trace(
        session_id="example-session-id"
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

세션을 활용하여 트레이스가 그룹화 되는지 확인하기위해 한번더 호출하겠습니다.

```
groq_invoke()
```
{% endtab %}

{% tab title="LangChain" %}
```notebook-python
pip install -q langfuse langchain langchain_groq
```

```python
import os

os.environ["LANGFUSE_SECRET_KEY"] = "sk-lf-b24f1ed3-10a0-400d-9975-07047d16a028"
os.environ["LANGFUSE_PUBLIC_KEY"] = "pk-lf-d20eea6c-da94-45ac-9e18-548dee6f47ae"
os.environ["LANGFUSE_HOST"] = "https://langshark.smileshark.help"
```

```python
from langfuse.callback import CallbackHandler

callback_handler = CallbackHandler(
    sample_rate=0.5
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

### 세션 확인

트레이스는 2개가 생성되었고, 세션탭 확인시 동일 세션에 2개 트레이스가 그룹화된것을 확인할 수 있습니다.

<figure><img src="../.gitbook/assets/image (4).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (1) (1).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../.gitbook/assets/image (2) (1).png" alt=""><figcaption></figcaption></figure>
