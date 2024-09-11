# 로깅 레벨

트레이스에는 많은 관찰(Observation)이 있을 수 있습니다. 때문에 트레이스의 디테일 정도를 제어하고 오류와 경고를 강조하는 속성을 활용하여 중요성을 구분할 수 있습니다.

사용할 수 있는 레벨은 `DEBUG`, `DEFAULT`, `WARNING`, `ERROR` 가 있습니다.

레벨 외에도 추가적인 맥락을 제공하기 위해 `statusMessage` 를 포함할 수도 있습니다.

LangChain 통합시에는, 자동으로 설정되기 때문에 이를 설정할 필요는 없습니다.

### 예제

![](../.gitbook/assets/colab-badge.svg)

<table data-view="cards"><thead><tr><th></th><th></th><th></th><th data-hidden data-card-cover data-type="files"></th></tr></thead><tbody><tr><td></td><td>Python Decorator</td><td></td><td><a href="../.gitbook/assets/python(3).png">python(3).png</a></td></tr><tr><td></td><td>LangChain 사용시 자동으로 설정됩니다.</td><td></td><td><a href="../.gitbook/assets/1_MVJZLfszGGNiJ-UFK4U31A.png">1_MVJZLfszGGNiJ-UFK4U31A.png</a></td></tr><tr><td></td><td>LlamaIndex (soon)</td><td></td><td><a href="../.gitbook/assets/eyecatch-llamdaindex.webp">eyecatch-llamdaindex.webp</a></td></tr></tbody></table>

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

    # 여기에 로깅레벨을 설정할 수 있습니다.
    # !주의! update_current_trace가 아닙니다!
    langfuse_context.update_current_observation(
        level="WARNING",
        status_message="This is a warning"
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
LangChain 사용시 자동으로 로깅레벨을 설정합니다.
{% endtab %}

{% tab title="LlamaIndex" %}
```ruby
soon
```
{% endtab %}
{% endtabs %}

### 결과물 확인

{% embed url="https://langshark.smileshark.help/project/cm0ukgugn0002tk69g52olded/traces/574313c3-245e-472d-b100-2be556ecbc40" %}

#### 트레이스 상세에 로깅 레벨이 추가된 것을 확인할 수 있습니다.

<figure><img src="../.gitbook/assets/image (3) (1).png" alt=""><figcaption></figcaption></figure>

#### 이후 트레이스에서 로그를 조건값으로 확인할 수 있게 됩니다.

다음과 같이 에러가 발생한 체인을 식별할 수 있습니다.

<figure><img src="../.gitbook/assets/image (1) (1) (1).png" alt=""><figcaption></figcaption></figure>
