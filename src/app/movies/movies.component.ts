import { Component, OnInit } from '@angular/core';
import { MovieService } from '../shared/services/movie.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../UI/modal/modal.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  movies: any = [];
  next: any;
  previous: any;
  visible: boolean = true;
  isdisabled: boolean = false;
  error: boolean = false;
  searchedKeyword: any;
  error_url: string = ""

  constructor(
    public movieService: MovieService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    const rootURL="https://demo.credy.in/api/v1/maya/movies/";
    this.movieService.getMovies(rootURL).subscribe(
      (data) => {
        setTimeout(() => {
          this.visible = false;
          const prev = 'previous';
          this.previous = data[prev as keyof Object];
          const nex = 'next';
          this.next = data[nex as keyof Object];
          const result = 'results';
          this.movies = data[result as keyof Object];
          if (this.previous === null) {
            this.isdisabled = true;
          }else this.isdisabled = false;
        }, 3000);
      },
      (err) => {
      const url = "url"
      this.error_url = err[url as keyof Object]
      this.error = true;
      this.visible = false;
      }
    );
  }

  Next() {
    this.visible = true;
    this.movieService.getMovies(this.next).subscribe((data) => {
      setTimeout(() => {
        this.visible = false;
        const prev = 'previous';
        this.previous = data[prev as keyof Object];
        const nex = 'next';
        this.next = data[nex as keyof Object];
        const result = 'results';
        this.movies = data[result as keyof Object];
        if (this.previous === null) {
          this.isdisabled = true;
        }else this.isdisabled = false;
      }, 3000);
    },
    (err) => {
      const url = "url"
      this.error_url = err[url as keyof Object]
      this.error = true;
      this.visible = false;
    }    );
  }

  Previous() {
    this.visible = true;
    this.movieService.getMovies(this.previous).subscribe((data) => {
      setTimeout(() => {
        this.visible = false;
        const prev = 'previous';
        this.previous = data[prev as keyof Object];
        const nex = 'next';
        this.next = data[nex as keyof Object];
        const result = 'results';
        this.movies = data[result as keyof Object];
        if (this.previous === 'null') {
          this.isdisabled = true;
        }else this.isdisabled = false;
      }, 3000);
    },
    (err) => {
      const url = "url"
      this.error_url = err[url as keyof Object]
      this.error = true;
      this.visible = false;

    }
    );
  }

  openModal(movie: any) {
    const modalRef = this.modalService.open(ModalComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
    });

    modalRef.componentInstance.fromParent = movie;
  }

  refresh(){
    this.movieService.getMovies(this.error_url).subscribe((data) => {
      this.visible =true;
      setTimeout(() => {
        this.error = false;
        const prev = 'previous';
        this.previous = data[prev as keyof Object];
        const nex = 'next';
        this.next = data[nex as keyof Object];
        const result = 'results';
        this.movies = data[result as keyof Object];
        this.visible=false;
        if (this.previous === null) {
          this.isdisabled = true;
        }else this.isdisabled = false;
      }, 3000);
    },
    (err) => {
      const url = "url"
      this.error_url = err[url as keyof Object]
      this.error = true;
      this.visible = false;

    }
    );
  }
}
