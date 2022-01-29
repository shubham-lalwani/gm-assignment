import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TestBed, async, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfigService } from './config.service';
// import { HttpClientModule, HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs/observable/of';

describe('AppComponent', () => {
  let component: AppComponent;
  const jsonData = [
    {
      field: 'name',
      label: 'Name',
      type: 'text',
      hidden: 'false',
      mandatory: true,
    },
    {
      field: 'name',
      label: 'Name',
      type: 'text',
      hidden: 'false',
      mandatory: true,
    },
  ];
  const configStub = {
    getData: jasmine
      .createSpy('ConfigService::getData')
      .and.returnValues(of(jsonData)),
  };
  beforeAll(() => {
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );
  });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: ConfigService,
          useValue: configStub,
        },
        HttpClientTestingModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [AppComponent],
    }).compileComponents();
  }));
  it('should render app', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  }));
});
