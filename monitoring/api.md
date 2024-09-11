# 일일 지표API

## 개요

**일일 지표 API**를 통해 LangShark의 집계된 일일 사용량 및 비용 메트릭스를 검색하여 분석, 요금 청구, 속도 제한 등의 하위 작업에 활용할 수 있습니다. 이 API를 사용하면 애플리케이션 유형, 사용자 또는 태그별로 필터링하여 맞춤형 데이터를 검색할 수 있습니다.

### 데이터

반환되는 데이터에는 다음과 같은 일일 시계열 데이터들이 포함됩니다:

* USD 기준 비용
* 트레이스 및 Observation 횟수
* 모델 이름별 세부 내역 확인
  * 사용량(예: 토큰 수)을 Input/Output 사용량 구분
  * USD 기준 비용
  * 트레이스 및 관찰 횟수

선택적 필터:

* `traceName`: 일반적으로 애플리케이션 유형별로 필터링하는 데 사용합니다. (트레이스에서 `name`을 어떻게 사용하는지에 따라 다릅니다.)
* `userId`: 사용자별 필터링
* `tags`: 태그별 필터링
* `fromTimestamp`: 시작 날짜/시간
* `toTimestamp`: 종료 날짜/시간

<figure><img src="../.gitbook/assets/image (3).png" alt=""><figcaption></figcaption></figure>

### 호출 예시

**<호출 방식>**

API 호출은 `Basic Auth` 를 사용한 인증이 필요합니다.

```bash
<your_pk>:<your_sk> # base64 인코딩이 필요합니다.
```

Python 코드 예시

```python
# 사용자 이름과 비밀번호
username = 'your_public_key'
password = 'your_secret_key'

# Basic Authentication을 사용하여 GET 요청 보내기
response = requests.get(url, auth=HTTPBasicAuth(username, password))
```

**\<API call example>**

```sh
GET langshark.smileshark.help/api/public/metrics/daily
```

```json
{
  "data": [
    {
      "date": "2024-09-10",
      "countTraces": 28,
      "countObservations": 28,
      "totalCost": 0.068223,
      "usage": [
        {
          "model": "anthropic.claude-3-5-sonnet-20240620-v1:0",
          "inputUsage": 23,
          "outputUsage": 341,
          "totalUsage": 364,
          "totalCost": 0.005184,
          "countObservations": 1,
          "countTraces": 1
        },
        {
          "model": "llama-3.1-70b-versatile",
          "inputUsage": 258,
          "outputUsage": 4151,
          "totalUsage": 4409,
          "totalCost": 0.063039,
          "countObservations": 6,
          "countTraces": 6
        },
        {
          "model": null,
          "inputUsage": 0,
          "outputUsage": 0,
          "totalUsage": 0,
          "totalCost": 0,
          "countObservations": 21,
          "countTraces": 21
        }
      ]
    },
    {
      "date": "2024-09-09",
      "countTraces": 195,
      "countObservations": 1364,
      "totalCost": 0.86053464,
      "usage": [
        {
          "model": "anthropic.claude-3-5-sonnet-20240620-v1:0",
          "inputUsage": 2158,
          "outputUsage": 1563,
          "totalUsage": 3721,
          "totalCost": 0.029919,
          "countObservations": 2,
          "countTraces": 2
        },
        {
          "model": "gemma2-9b-it",
          "inputUsage": 84845,
          "outputUsage": 4698,
          "totalUsage": 89543,
          "totalCost": 0.0479005,
          "countObservations": 33,
          "countTraces": 33
        },
        {
          "model": "gemma-7b-it",
          "inputUsage": 85200,
          "outputUsage": 4504,
          "totalUsage": 89704,
          "totalCost": 0.394848,
          "countObservations": 33,
          "countTraces": 33
        },
        {
          "model": "llama-3.1-70b-versatile",
          "inputUsage": 40114,
          "outputUsage": 1412,
          "totalUsage": 41526,
          "totalCost": 0.129348,
          "countObservations": 18,
          "countTraces": 18
        },
        {
          "model": "llama-3.1-8b-instant",
          "inputUsage": 76410,
          "outputUsage": 5572,
          "totalUsage": 81982,
          "totalCost": 0.01803604,
          "countObservations": 33,
          "countTraces": 33
        },
        {
          "model": "llama3-70b-8192",
          "inputUsage": 59472,
          "outputUsage": 2284,
          "totalUsage": 61756,
          "totalCost": 0.1526773,
          "countObservations": 27,
          "countTraces": 27
        },
        {
          "model": "mixtral-8x7b-32768",
          "inputUsage": 173354,
          "outputUsage": 13995,
          "totalUsage": 187349,
          "totalCost": 0.0878058,
          "countObservations": 49,
          "countTraces": 49
        },
        {
          "model": null,
          "inputUsage": 0,
          "outputUsage": 0,
          "totalUsage": 0,
          "totalCost": 0,
          "countObservations": 1169,
          "countTraces": 195
        }
      ]
    }
  ],
  "meta": {
    "page": 1,
    "limit": 50,
    "totalItems": 2,
    "totalPages": 1
  }
}
```

세부사항은 다음 API Reference를 참고하세요.

{% file src="../.gitbook/assets/openapi.yml" %}
