import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { AppComponent } from './app.component';
import { User } from './model/user.interface';
import { UserService } from './services/user.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'

describe('AppComponent', () => {
  let appComponent: any;
  let servicio: any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
        
      ],
      declarations: [
        AppComponent
      ], 
      providers:[UserService, AppComponent],
    }).compileComponents();
    appComponent = TestBed.get(AppComponent)
    servicio= TestBed.get(UserService)
  });

  beforeAll(()=>{
    console.log("beforeAll se ejecuta al iniciar las pruebas it");
  })
  afterAll(() =>{
    console.log("afterAll se ejecuta al finalizar las pruebas it")
  })

  it('Debe crear un componente', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('el valor de myVar debe ser hola mundo', ()=>{
    const valor = appComponent.myVar
    expect(valor).toEqual('Hola mundo');
  });

  it('La variable saludo debe contener jonathan',()=>{
    const valor = appComponent.saludo
    expect(valor).toContain('jonathan')
  });

  it('Debe retornar true', ()=>{
    const respuesta = appComponent.par(44);
    expect(respuesta).toBeTruthy()

  });
  it('Debe retornar False', ()=>{   
    const respuesta = appComponent.par(15);
    expect(respuesta).toEqual(false);
  });

  it('Debe llamar a nuestro servicio getAll() para obtener todos los usuarios',()=>{
    let mockUser: User[]= [
      {
        login: "octocat",
        id: 1,
        node_id: "MDQ6VXNlcjE=",
         avatar_url: "https://github.com/images/error/octocat_happy.gif",
         gravatar_id: "",
         url: "https://api.github.com/users/octocat",
        html_url: "https://github.com/octocat",
        followers_url: "https://api.github.com/users/octocat/followers",
        following_url: "https://api.github.com/users/octocat/following{/other_user}",
        gists_url: "https://api.github.com/users/octocat/gists{/gist_id}",
        starred_url: "https://api.github.com/users/octocat/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/octocat/subscriptions",
        organizations_url: "https://api.github.com/users/octocat/orgs",
        repos_url: "https://api.github.com/users/octocat/repos",
        events_url: "https://api.github.com/users/octocat/events{/privacy}",
        received_events_url: "https://api.github.com/users/octocat/received_events",
        type: "User",
        site_admin: "false",
        name: "monalisa octocat",
        company: "GitHub",
        blog: "https://github.com/blog",
        location: "San Francisco",
        email: "octocat@github.com",
        hireable: "false",
        bio: "There once was...",
        twitter_username: "monatheoctocat",
        public_repos: 2,
        public_gists: 1,
        followers: 20,
        following: 0,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]
    const users= spyOn(servicio, 'getAll').and.callFake(function(){
      return of(mockUser)
    });
    
    appComponent.ngOnInit()
    expect(users).toHaveBeenCalled()
  })

});
