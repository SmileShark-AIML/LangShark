# 샘플링

샘플링은 LangShark가 수집하는 트레이스의 양을 조절하는데 사용할 수 있습니다.

파이썬 데코레이터의 경우 LANGFUSE\_SAMPLE\_RATE를 환경변수를 설정할 수 있습니다.

프레임워크 통합에서는 sample\_rate를 설정하여 샘플 속도를 구성할 수 있으며 값은 0과 1 사이의 소수입니다.

1은 모든 트레이스가 수집됨을 의미하며 0.2는 전체 트레이스의 20%만 수집됨을 의미합니다.

### 예제

![](../.gitbook/assets/colab-badge.svg)

<table data-view="cards"><thead><tr><th></th><th></th><th></th><th data-hidden data-card-target data-type="content-ref"></th><th data-hidden data-card-cover data-type="files"></th></tr></thead><tbody><tr><td></td><td>Python Decorator</td><td></td><td><a href="https://colab.research.google.com/drive/1ZcR1WaQvlmcSX5fzV-GS73xP3nDrKTzc?usp=sharing">https://colab.research.google.com/drive/1ZcR1WaQvlmcSX5fzV-GS73xP3nDrKTzc?usp=sharing</a></td><td><a href="../.gitbook/assets/python(3).png">python(3).png</a></td></tr><tr><td></td><td>LangChain</td><td></td><td><a href="https://colab.research.google.com/drive/13FuMybfa091Nf0zxCpYXHdeG9X7IfBCS?usp=sharing">https://colab.research.google.com/drive/13FuMybfa091Nf0zxCpYXHdeG9X7IfBCS?usp=sharing</a></td><td><a href="../.gitbook/assets/1_MVJZLfszGGNiJ-UFK4U31A.png">1_MVJZLfszGGNiJ-UFK4U31A.png</a></td></tr><tr><td></td><td>LlamaIndex (soon)</td><td></td><td></td><td><a href="../.gitbook/assets/eyecatch-llamdaindex.webp">eyecatch-llamdaindex.webp</a></td></tr></tbody></table>

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
```notebook-python
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

