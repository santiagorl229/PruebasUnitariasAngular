import { TestBed,getTestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { User } from '../model/user.interface';

describe('UserService', () => {
  let service: UserService;
  let injector: TestBed
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    //Tener   acceso a las variables limpias  de cada it()
    injector = getTestBed()
    httpMock = injector.get(HttpTestingController)

  });
  afterEach(()=>{
    //verificamos que no haya solicitudes pendientes
    httpMock.verify()
  })


  it("Debe retornar el observable<User>",()=>{
    const service:UserService = TestBed.get(UserService);
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
    service.getAll().subscribe((users)=>{
      expect(users.length).toBe(1)
      expect(users).toEqual(mockUser)
      expect(users[0].login).toBeDefined()
    })
    const req= httpMock.expectOne('https://api.github.com/user')
    expect(req.request.method).toBe('GET')
    req.flush(mockUser)
  })
});
