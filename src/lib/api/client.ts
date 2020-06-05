import axios from 'axios';
/*
axios 인스턴스를 만들면 나중에 API 클라이언트에 공통된 설정을 쉽게 넣어 줄 수 있습니다. 

사실 인스턴스를 만들지 않아도 이러한 작업을 할 수 있습니다. 

하지만 인스턴스를 만들지 않으면 애플리케이션에서 발생하는 모든 요청에 대해 설정하게 되므로, 

또 다른 API 서버를 사용하려 할 때 곤란해질 수 있습니다. 

따라서 처음 개발할 때부터 이렇게 인스턴스를 만들어서 작업하는 것을 권장합니다.

추가로 나중에 axios를 사용하지 않는 상황이 왔을 때 쉽게 클라이언트를 교체할 수 있는 것 또한 장점입니다.

*/
const client = axios.create();

/*
  글로벌 설정 예시:
  
  // API 주소를 다른 곳으로 사용함
  client.defaults.baseURL = 'https://external-api-server.com/' 

  // 헤더 설정
  client.defaults.headers.common['Authorization'] = 'Bearer a1b2c3d4';

  // 인터셉터 설정
  axios.intercepter.response.use(\
    response => {
      // 요청 성공 시 특정 작업 수행
      return response;
    }, 
    error => {
      // 요청 실패 시 특정 작업 수행
      return Promise.reject(error);
    }
  })  
*/

export default client;
