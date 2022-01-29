import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfigService } from './config.service';
// import { HttpClientModule, HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  const jsonData = [
    {
      field: 'name',
      label: 'Name',
      type: 'text',
      hidden: 'false',
      mandatory: true,
    },
  ];
  const configStub = {
    getData: jasmine.createSpy('configService').and.returnValues(jsonData),
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
          usevalue: configStub,
        },
        HttpClientTestingModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [AppComponent],
    }).compileComponents();
  }));
  it('should render app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'Welcome to app!!'
    );
  }));
});
