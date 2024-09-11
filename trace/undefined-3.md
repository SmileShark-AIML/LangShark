# 태그

태그를 활용하면 트레이스를 분류하고 필터링 할 수 있습니다. 태그는 문자열로 구성되며 한개의 트레이스에는 여러개의 태그를 설정할 수 있습니다.

### 예제

![](../.gitbook/assets/colab-badge.svg)

<table data-view="cards"><thead><tr><th></th><th></th><th></th><th data-hidden data-card-cover data-type="files"></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td></td><td>Python Decorator</td><td></td><td><a href="../.gitbook/assets/python(3).png">python(3).png</a></td><td><a href="https://colab.research.google.com/drive/1ai1m3cmobLDqsb6hxGIaiMLNW-cjw2EC?usp=sharing">https://colab.research.google.com/drive/1ai1m3cmobLDqsb6hxGIaiMLNW-cjw2EC?usp=sharing</a></td></tr><tr><td></td><td>LangChain</td><td></td><td><a href="../.gitbook/assets/1_MVJZLfszGGNiJ-UFK4U31A.png">1_MVJZLfszGGNiJ-UFK4U31A.png</a></td><td><a href="https://colab.research.google.com/drive/1QzpH-cruZ7w_pJQ67K76ERM7FfB4SYBy?usp=sharing">https://colab.research.google.com/drive/1QzpH-cruZ7w_pJQ67K76ERM7FfB4SYBy?usp=sharing</a></td></tr><tr><td></td><td>LlamaIndex (soon)</td><td></td><td><a href="../.gitbook/assets/eyecatch-llamdaindex.webp">eyecatch-llamdaindex.webp</a></td><td></td></tr></tbody></table>

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

    # 여기에 태그를 설정할 수 있습니다.
    langshark_context.update_current_trace(
        tags=["tag-1", "tag-2"]
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
pip install -q langchain langchain_groq
```

```
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
from langshark.callback import CallbackHandler

callback_handler = CallbackHandler(
    tags=["tag-1", "tag-2"]
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

{% embed url="https://langshark.smileshark.help/project/cm0ukgugn0002tk69g52olded/traces/9af49908-9020-4c79-a020-3de291537987" %}

#### 트레이스 상세에 태그가 추가된 것을 확인할 수 있습니다.

<figure><img src="../.gitbook/assets/image (17).png" alt=""><figcaption></figcaption></figure>

#### 이후 트레이스에서 태그를 조건값으로 확인할 수 있게 됩니다.

<figure><img src="../.gitbook/assets/image (18).png" alt=""><figcaption></figcaption></figure>

태그는 UI에서도 수동으로 추가할 수 있습니다.

<figure><img src="../.gitbook/assets/image (19).png" alt=""><figcaption></figcaption></figure>
