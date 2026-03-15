import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GithubService } from './service/github.service';
import { CommonModule } from '@angular/common';
import emailjs from '@emailjs/browser';
import { FormsModule } from '@angular/forms';
declare var bootstrap: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit, OnInit {
  constructor(private githubService: GithubService) { }
  @ViewChild('toastElement') toastElement!: ElementRef;
  @ViewChild('toastBody') toastBody!: ElementRef;

  SERVICE_ID: string = 'service_520vk0f';
  TEMPLATE_ID: string = 'template_j4cjzq8';
  PUBLIC_KEY: string = 'dBeZN7KYZ5YznjX9A';

  title = 'portfolio';
  roles = [
    "Full-Stack Developer",
    "Node.js & Python Backend Developer",
    "Angular Frontend Developer",
    "Cloud & DevOps Enthusiast"
  ];

  repositories: any[] = [];
  skills: any[] = [
    {
      name: "JavaScript",
      desc: "Core language of the web used for building dynamic and interactive applications.",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
    },
    {
      name: "TypeScript",
      desc: "Typed superset of JavaScript that improves scalability, maintainability, and developer productivity.",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
    },
    {
      name: "Angular",
      desc: "Frontend framework for building scalable single-page applications with TypeScript.",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg"
    },
    {
      name: "Node.js",
      desc: "JavaScript runtime used to build fast and scalable backend applications.",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
    },
    {
      name: "MySQL",
      desc: "Popular relational database used for structured data storage in web applications.",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
    },
    {
      name: "PostgreSQL",
      desc: "Advanced open-source relational database known for reliability and powerful features.",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
    },
    {
      name: "Redis",
      desc: "In-memory data store used for caching, session management, and high-performance applications.",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg"
    },
    {
      name: "AWS",
      desc: "Cloud platform used for deploying, scaling, and managing applications and infrastructure.",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"
    },
    {
      name: "Python",
      desc: "Versatile programming language used for backend development, automation, and data processing.",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
    },
    {
      name: "Linux Commands",
      desc: "Experience with Linux terminal commands for server management, development, and deployment tasks.",
      img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg"
    }
  ];

  name = '';
  email = '';
  message = '';
  roleIndex = 0;
  charIndex = 0;
  typingElement: any;

  ngOnInit() {
    this.githubService.getRepos().subscribe({
      next
        : (repos) => {
          this.repositories = repos;
          console.log('Fetched repositories:', this.repositories);
        }, error: (err) => {
          console.error('Error fetching repositories:', err);
        }
    });
  }

  ngAfterViewInit() {

    this.typingElement = document.getElementById("typing-text");

    setInterval(() => {
      this.typeEffect();
    }, 120);
  }

  scrollTo(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  typeEffect() {

    if (!this.typingElement) return;

    const currentRole = this.roles[this.roleIndex];

    if (this.charIndex < currentRole.length) {

      this.typingElement.innerHTML += currentRole.charAt(this.charIndex);
      this.charIndex++;

    } else {

      setTimeout(() => {
        this.typingElement.innerHTML = "";
        this.charIndex = 0;
        this.roleIndex = (this.roleIndex + 1) % this.roles.length;
      }, 1500);

    }

  }

  sendMessage() {
    console.log(this.name, this.email, this.message, ".............");

    if (!this.name || !this.email || !this.message) {
      this.showToast('Please fill all fields', 'danger');
      return;
    }

    const templateParams = {
      name: this.name,
      email: this.email,
      message: this.message,
    };

    emailjs.send(this.SERVICE_ID, this.TEMPLATE_ID, templateParams, this.PUBLIC_KEY)
      .then(
        (response) => {
          this.name = '';
          this.email = '';
          this.message = '';
          
          this.showToast('Message sent successfully!', 'success');
        },
        (error) => {
          console.error(error);
          this.showToast('Failed to send message. Try again.', 'danger');
        }
      );
  }

  showToast(message: string, type: 'success' | 'danger' | 'warning' = 'success') {
    const toastEl = this.toastElement.nativeElement as HTMLElement;
    const toastBodyEl = this.toastBody.nativeElement as HTMLElement;

    // Set the message
    toastBodyEl.textContent = message;

    // Remove previous bg classes
    toastEl.classList.remove('text-bg-success', 'text-bg-danger', 'text-bg-warning');

    // Add new bg class based on type
    toastEl.classList.add(`text-bg-${type}`);

    // Show the toast
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
  }
}
