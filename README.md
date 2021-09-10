# nuber-eats-challenges-day19

<details>
  <summary>
  Day 18 정답해설
  </summary>

1. entity 설정 구현 코드를 작성하기 앞서, entity를 작성해 놓지 않으면 진행할 수가 없습니다. 생각해봐야할 entity는 episode, review entity는 새로 만들어야 할 것이고, subscription과 review, markEpisodeAsPlayed를 구현하기 위해서는 relation 수정 설정도 필요합니다.
- episode entity
![](https://i.ibb.co/Nt0CfGz/episode-1.png)
- 여태까지 배운과정에 따라왔다면, entity 만드는데에는 이제 어려움은 없을 것입니다. 그런데 12번 라인을 보면, eager: true라는 옵션이 보이실 겁니다. eager 데코레이터가 설정되어 있으면, N:1로 관계가 설정된 podcast의 데이터를 따로 설정 없이(이를테면, find 함수의 relation 사용) db에서 쉽게 가져올 수 있습니다.
- review entity 만들기
![](https://i.ibb.co/nM2WRKz/review.png)
- review는 작성자(User)와 대상(Podcast)가 필요하고 각각 리뷰와 1:N 관계가 필요하므로 위와 같이 entity를 작성할 수 있습니다. CoreEntity는 uber-eats 클론 강의에도 나오듯, 기본 베이스(updatedAt, createdAt, id) 등을 설정한 추상 entity입니다.
- user / podcast entity 수정
![](https://i.ibb.co/qNdNWyy/podcast-entity.png)
위 코드에서 보시다시피 episode와 review 1:N 관계 설정이 추가되었습니다.
![](https://i.ibb.co/xqz141t/user-entity.png)
위의 코드는 수정된 user entity입니다. review, markEpisodeAsPlayed, subscribeToPodcast 구현을 위한 relation이 추가된 것을 확인할 수 있습니다.

2. resolver 구현 
어김없이 우리는 여기서 code first 방식으로 접근하여 resolver 작성과 service에서 구현을 하도록 작성합니다.
searchPodcast find는 이제 익숙하기 사용하실 수 있으셔야 합니다. pagination을 구현해 보시는 것도 추천드립니다.
![](https://i.ibb.co/WkGfqGW/search-Podcast.png)
take, skip을 이용하여 pagination을 구현한 부분이 보이실 겁니다. 또한 주의하셔야할 부분이 하나 있는데, where 옵션을 보시면 title: Like를 이용한 것이 보이실 건데, sqlite에는 case insensitive한 ILIKE가 없습니다. 그래서 typeorm의 Like를 사용하셔도 case insensitive하게 find를 수행할 수 있으며 또는, 위 코드의 주석문으로 처리한 Raw(sql 문법사용할 수 있는 유틸함수)를 이용하시면 됩니다.

- reviewPodcast reviewPodcast는 특별히 어려운 점이 없을 것 같습니다. review를 작성한 사람, 대상 팟캐스트만 설정해서 entity를 만들면된다는 점이외에는 특별히 어려울 것이 없을 것 같습니다.
- subscribeToPodcast
![](https://i.ibb.co/7pPNXs1/subscribe-1.png)
위의 코드는 subscribeToPodcast mutation의 구현 부분입니다. 솔루션에서는 toggleSubscribe으로 subscribe을 toggle할 수 있는 방식으로 구현되었습니다. 7번째 라인을 보시면 some이라는 함수가 보이실 겁니다. 혹시라도 익숙하지 않으신 분은 mdn some 문서를 참고하셔서 이 기회에 알아두시길 바랍니다. 이미 구독이 있으면 구독에서 삭제하는 부분은 filter 함수를 이용하여 배열에서 삭제하도록 구현되어 있습니다. 구독에 포함시키는 부분은 spread operator를 이용하여 구현되어 있습니다.
- seeSubscription 
구현하는데 크게 힘든 부분이 없어서 여기서는 딱히 설명할 내용은 없습니다. 솔루션의 코드를 참고 바랍니다~
- markEpisodeAsPlayed
![](https://i.ibb.co/fpnYFWF/mark-As-Played.png)
playedEpisodes는 entity에 episode와 1:n 관계로 묶인 episode 배열입니다. 솔루션에서는 로직이 단순하게 구현되어 있습니다. 해당 episode를 episodesEpisodes에 추가한 것입니다. 솔루션과는 달리 해당 에피소드를 이미 시청한 경우에는 추가시키지 않는 로직을 만드는 것도 괜찮아 보입니다. includes나, every 등을 이용하면 구현할 수 있습니다.


###결론
드디어 백엔드를 마무리 했습니다. 챌린지가 이제 곧 프론트 엔드로 넘어가면서, 구현하고 싶은 것들이 욕심이 생기실 수도 있는데, 그때마다 백엔드를 수정해야 합니다. 짧은 제 생각인데, 백엔드에서 여러분들이 구현하고 싶은게 많을 수록, 프론트가 풍부해지지 않나.. 그런 생각이 듭니다. 백엔드 연습 많이 해주세요.
</details>

### Deploy!

- 오늘의 강의: 우버 이츠 클론코딩 강의 #24.0 - #24.2 (21.09.10)
- 오늘의 과제: 위의 강의를 시청하신 후, 아래 코드 챌린지를 제출하세요.

### Code Challenge

- Today's soluton is based on ＠jonganebski's sandbox.
- `toggleSubscribe is a thing of beauty, great work!!
- Today we are gonna skip some videos and are gonna go to the end, on today's challenge we have to deploy our server to Heroku. Download the Sandbox and by following the video deploy the server to Heroku!
- Submit the herokuapp.com URL, make sure to leave the /playground enabled.
- 이번에는 나머지 강의들을 스킵하고 끝 부분으로가서, Heroku에 backend를 deploy하는 것입니다.
- Sandbox에서 코드를 다운받은 후에, Heroku deploy 부분의 영상을 보시고, herokuapp.com 주소를 제출하시면 됩니다! playground(or /graphql)는 활성화 된 상태가 되도록 합니다.


<details>
  <summary>
  Hint
  </summary>

- 강의 영상에 따라 차근차근 deploy를 진행하시면 됩니다.
- deploy 후에 에러가 발생한다면, 콘솔) heroku logs --tail를 이용하거나, heroku 앱 페이지에서 헤더 우측의 More > View logs 메뉴를 이용하여 로그를 확인하신 후에 에러 코드를 확인합니다.
- 꼭, 꼭, Procfile 작성과 Config Vars(환경변수 설정)를 잊지 않도록 합니다.
- 금번 챌린지에서는 sqlite3는 사용하시면 안되십니다(주기적으로 데이터 청소가 됨). postgres나 자신이 좋아하시는 database를 이용하시면 됩니다. heroku 안에서 편하게 사용할 수 있는 database를 제공합니다. 강의내용 참고하셔서 설정해주시면 됩니다.
- postgres 사용 위해서는 pg 패키지를 설치해야 합니다.
- Config Vars에 PORT 설정하는 것 꼭 잊지 마세요.
</details>