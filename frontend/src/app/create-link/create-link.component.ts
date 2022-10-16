import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { HttpClient } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { api } from 'src/environments/environment';


@Component({
  selector: 'app-create-link',
  templateUrl: './create-link.component.html',
  styleUrls: ['./create-link.component.css']
})
export class CreateLinkComponent implements OnInit {
  content?: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    loadScript('https://cdn.belvo.io/belvo-widget-1-stable.js');
  }
}

async function createWidget() {
  // Function to call your server-side to generate the access_token and retrieve the your access token
  function getAccessToken() {
      // Make sure to change /get-access-token to point to your server-side.
      return fetch( api.url + 'belvo/auth/token', {
              method: 'GET'
          })
          .then(response => response.json())
          .then((data) => data)
          .catch(error => console.error('Error:', error))
  }
  const successCallbackFunction = (link: any, institution: any) => {
    console.log("token: "+ token)
    fetch( api.url + "users/me/links", {
        method: "POST",
        body: JSON.stringify({
          "link": link,
          "institution": institution
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": 'Bearer ' + token,
        }
    }).then(response => response.json())
      .then((data) => data)
      .catch(error => console.error('Error:', error))
    return
  }
  const onExitCallbackFunction = (data: any) => {
      // Do something with the exit data.
  }
  const onEventCallbackFunction = (data: any) => {
      // Do something with the exit data.
  }

  const config = {

      // Add your startup configuration here.
      external_id: getUserFromToken(token),
      callback: (link: any, institution: any) => successCallbackFunction(link, institution),
      onExit: (data: any) => onExitCallbackFunction(data),
      onEvent: (data: any) => onEventCallbackFunction(data)
  }
  const { access } = await getAccessToken();
  // @ts-ignore
  window.belvoSDK.createWidget(access, config).build();
}

var token = window.sessionStorage.getItem("auth-token")

function getUserFromToken(token: any): any {
  try {
    let payload: any = jwt_decode(token);
    return payload.sub;
  } catch(Error) {
    return null;
  }
}

function loadScript(src: string) {
  let node = document.createElement('script');
  node.src = src;
  node.type = 'text/javascript';
  node.async = true;
  // Assign the callback which will create the Widget
  node.onload = createWidget;
  document.getElementsByTagName('head')[0].appendChild(node);
}