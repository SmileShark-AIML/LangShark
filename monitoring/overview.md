# Overview

<figure><img src="../.gitbook/assets/image (2).png" alt=""><figcaption></figcaption></figure>

Langshark는 LLM에서 생산되는 데이터를 수집하여 인사이트를 제공합니다.

아래 링크를 통해 Demo 대시보드를 확인할 수 있습니다.

{% hint style="info" %}
계정이 없다면 다음 Example Account를 사용해보세요.

ID: [example@example.com](mailto:example@example.com)

Password: exampleexample

[https://langshark.smileshark.help/](https://langshark.smileshark.help/)
{% endhint %}

## 지표

* 품질(Quality)은 사용자 피드백, 모델 기반 점수, 인간 참여 채점 샘플 또는 SDK/API를 통한 맞춤 점수(점수 참조)를 통해 측정됩니다. 품질은 시간 경과에 따라, 그리고 프롬프트 버전, LLM, 사용자 간에 평가됩니다.
* 비용과 지연 시간(Cost and Latency)은 사용자, 세션, 지역, 기능, 모델, 프롬프트 버전별로 정확하게 측정되며 확인 가능합니다.
* 볼륨(Volume)은 수집된 추적 정보와 사용된 토큰을 기반으로 계산됩니다.

### 차원

* [트레이스 이름 및 태그: 트레이스에 `name` 필드 및 태그를 추가하여 다양한 사용 사례, 기능 등을 구분합니다.](../trace/tag.md)
* [유저: 사용자별 사용량과 비용을 추적합니다. 트레이스에 `userId`만 추가하면 됩니다.](../trace/user.md)
* 릴리스 및 버전 번호: LLM 애플리케이션의 변경이 지표에 미치는 영향을 추적합니다.
