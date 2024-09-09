# LangShark

#### LangShark는 LLM 애플리케이션을 디버깅하고 분석, 반복하는데 활용할 수 있는 LLM 옵저버빌리티 엔지니어링 플랫폼입니다.

<figure><img src=".gitbook/assets/image (12).png" alt=""><figcaption></figcaption></figure>

## Why LLMOps?

LLMOps(Large Language Model Operations) 파이프라인은 대규모 언어 모델을 효과적으로 개발, 배포, 관리하기 위한 체계적인 접근 방식입니다.

<figure><img src=".gitbook/assets/image (5).png" alt=""><figcaption><p>LangShark Pipeline</p></figcaption></figure>

### 효율성 향상

LLMops 파이프라인은 많은 작업을 자동화합니다. 예를 들어, 데이터 전처리, 모델 훈련, 평가, 배포 등의 과정을 자동화할 수 있어 개발자와 데이터 과학자들이 반복적인 작업에 시간을 낭비하지 않고 더 중요한 작업에 집중할 수 있게 해줍니다. 또한, 이런 자동화된 프로세스는 일관성 있는 결과를 도출하는 데 도움이 됩니다.

### 품질 관리

LLM의 성능은 시간이 지남에 따라 변할 수 있습니다. LLMops 파이프라인은 모델의 성능을 지속적으로 모니터링하고 평가할 수 있는 도구를 제공합니다. 이를 통해 모델의 성능 저하를 빠르게 감지하고 대응할 수 있습니다. 또한, 모델의 여러 버전을 체계적으로 관리할 수 있어 필요시 이전 버전으로 쉽게 롤백할 수 있습니다.

### 확장성

데이터의 양과 모델의 복잡성이 증가함에 따라 시스템을 확장하는 것이 중요해집니다. LLMops 파이프라인은 클라우드 리소스를 효율적으로 활용하여 필요에 따라 쉽게 확장할 수 있는 구조를 제공합니다. 이는 대규모 데이터셋으로 모델을 훈련시키거나 많은 사용자에게 서비스를 제공할 때 특히 유용합니다.

### 협업 강화

LLMops 파이프라인은 개발자, 데이터 과학자, 운영팀 간의 협업을 촉진합니다. 모든 팀원이 동일한 도구와 프로세스를 사용하므로 의사소통이 원활해지고 작업 효율성이 향상됩니다. 또한, 팀 내에서 모범 사례와 노하우를 쉽게 공유할 수 있어 전체적인 팀의 역량이 향상됩니다.

### 보안 및 규정 준수

LLM은 종종 민감한 데이터를 다루게 됩니다. LLMops 파이프라인은 데이터 처리 과정에서의 보안을 강화하고, 모델 개발 및 배포 과정의 투명성을 확보할 수 있게 해줍니다. 이는 특히 금융, 의료 등 규제가 엄격한 산업에서 중요합니다.

### 빠른 반복과 개선

AI 기술은 빠르게 발전하고 있어 모델을 지속적으로 개선해야 합니다. LLMops 파이프라인은 새로운 모델 버전을 쉽게 테스트하고 비교할 수 있는 A/B 테스팅 환경을 제공합니다. 또한, 개선된 모델을 신속하게 프로덕션 환경에 배포할 수 있어 사용자에게 더 나은 서비스를 빠르게 제공할 수 있습니다.

## 핵심 플랫폼 기능

### Observability

애플리케이션을 관찰하고, LangShark를 통해 추적(Trace)를 수집합니다.

* [애플리케이션에서 호출되는 모든 LLM호출 및 관련 로직 추적](broken-reference)
* [Python용 SDK](broken-reference)
* [Python 용 @Observe 데코레이터](development/decorators.md)
* [LangChain(Graph)](development/langchain.md),[ LlamaIndex등에 대한 통합](development/llamaindex.md)
* [API 제공](monitoring/api.md)

### LangChain 대시보드

복잡한 로그 및 유저, 세션 및 디버깅

* [지표 (LLM비용, 대기시간, 품질 등)추적을 통한 인사이트](usageandcost/undefined.md)
* [LLM 생성물에 대한 점수를 수집하고 계산(평가)](evaluation/llm-as-a-judge.md)

## 프롬프트 관리

LangShark 내에서 프롬프트를 관리합니다.

* [프롬프트 관리 및 형상관리를 위한 Hub](development/undefined.md)
* [LLM과 쉬운 통합을 위한 Configuration 관리](./#undefined-7)

