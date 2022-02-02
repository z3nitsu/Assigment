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

  constructor(
    public movieService: MovieService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe(
      (data) => {
        setTimeout(() => {
          this.visible = false;
          const prev = 'previous';
          this.previous = data[prev as keyof Object];
          const nex = 'next';
          this.next = data[nex as keyof Object];
          const result = 'results';
          this.movies = data[result as keyof Object];
        }, 3000);
        // console.log(data)
      },
      (err) => {
        const http = 'HttpErrorResponse';
        const status = 'status';

        if(err[http as keyof Object][status as keyof Object] == '500'){
          this.error = true
        }
      }
    );

    if (this.previous == 'null') {
      this.isdisabled = true;
    }
  }

  Next() {
    this.visible = true;
    this.movieService.getMore(this.next).subscribe((data) => {
      setTimeout(() => {
        this.visible = false;
        const prev = 'previous';
        this.previous = data[prev as keyof Object];
        const nex = 'next';
        this.next = data[nex as keyof Object];
        const result = 'results';
        this.movies = data[result as keyof Object];
      }, 3000);
    });
    if (this.previous == 'null') {
      this.isdisabled = true;
    }
  }

  Previous() {
    this.visible = true;
    this.movieService.getMore(this.previous).subscribe((data) => {
      setTimeout(() => {
        this.visible = false;
        const prev = 'previous';
        this.previous = data[prev as keyof Object];
        const nex = 'next';
        this.next = data[nex as keyof Object];
        const result = 'results';
        this.movies = data[result as keyof Object];
      }, 3000);
    });
    if (this.previous == 'null') {
      this.isdisabled = true;
    }
  }

  openModal(movie: any) {
    const modalRef = this.modalService.open(ModalComponent, {
      scrollable: true,
      windowClass: 'myCustomModalClass',
      // keyboard: false,
      // backdrop: 'static'
    });

    modalRef.componentInstance.fromParent = movie;
    modalRef.result.then(
      (result) => {
        // console.log(result);
      },
      (reason) => {}
    );
  }
}
