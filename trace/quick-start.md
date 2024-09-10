# Quick-Start

이 퀵스타트 가이드는 LLM애플리케이션을 얼마나 쉽게 LangShark와 통합할 수 있는지 안내하고있습니다.

### 프로젝트를 생성하세요.

1. [회원가입을 진행합니다.](../getstarted/sign-in.md)
2. [조직을 설정합니다.](../getstarted/undefined.md)
3. [프로젝트를 설정하여 API키를 생성합니다.](../getstarted/undefined-1.md)

{% hint style="info" %}
계정이 없다면 다음 Example Account를 사용해보세요.

ID: example@example.com

Password: exampleexample

[https://langshark.smileshark.help/](https://langshark.smileshark.help/)
{% endhint %}

### LangShark를 사용하여 첫번째 로그를 확인해보세요.

LangShark는 모든 LLM통합을 위한 Native Python Decorator,

가장 인기있는 프레임워크인 LangChain, LlamaIndex를 지원하고 있습니다.

![](../.gitbook/assets/colab-badge.svg)

<table data-view="cards"><thead><tr><th></th><th></th><th></th><th data-hidden data-card-cover data-type="files"></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td></td><td>Python Decorator</td><td></td><td><a href="../.gitbook/assets/python(3).png">python(3).png</a></td><td><a href="https://colab.research.google.com/drive/1ZnY9qaKoqa2z3n_iVWSItYwkbQu-v2nO?usp=sharing">https://colab.research.google.com/drive/1ZnY9qaKoqa2z3n_iVWSItYwkbQu-v2nO?usp=sharing</a></td></tr><tr><td></td><td>LangChain</td><td></td><td><a href="../.gitbook/assets/1_MVJZLfszGGNiJ-UFK4U31A.png">1_MVJZLfszGGNiJ-UFK4U31A.png</a></td><td></td></tr><tr><td></td><td>LlamaIndex (Soon)</td><td></td><td><a href="../.gitbook/assets/eyecatch-llamdaindex.webp">eyecatch-llamdaindex.webp</a></td><td></td></tr></tbody></table>

{% tabs %}
{% tab title="Python Decorator" %}
{% code fullWidth="true" %}
```sh
pip install langfuse
```
{% endcode %}

```python
import os

os.environ["LANGFUSE_SECRET_KEY"] = "sk-lf-b24f1ed3-10a0-400d-9975-07047d16a028"
os.environ["LANGFUSE_PUBLIC_KEY"] = "pk-lf-d20eea6c-da94-45ac-9e18-548dee6f47ae"
os.environ["LANGFUSE_HOST"] = "https://langshark.smileshark.help"
```

```python
from langfuse.decorators import observe

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
```python
pip install langfuse langchain_groq
```

```python
import os

os.environ["LANGFUSE_SECRET_KEY"] = "sk-lf-b24f1ed3-10a0-400d-9975-07047d16a028"
os.environ["LANGFUSE_PUBLIC_KEY"] = "pk-lf-d20eea6c-da94-45ac-9e18-548dee6f47ae"
os.environ["LANGFUSE_HOST"] = "https://langshark.smileshark.help"
```

```python
from langfuse.callback import CallbackHandler
from langchain_groq import ChatGroq

callback_handler = CallbackHandler()

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

### 로그를 확인해보세요.

[예시 프로젝트](quick-start.md#undefined)를 확인하여 실제로 어떻게 로그와 트레이스가 수집되었는지 확인해보세요

{% embed url="https://langshark.smileshark.help/project/cm0ukgugn0002tk69g52olded/traces/bc7ebccf-2bbc-4349-964e-fa33389a3c5a" %}

<figure><img src="../.gitbook/assets/image (2) (1).png" alt=""><figcaption></figcaption></figure>
