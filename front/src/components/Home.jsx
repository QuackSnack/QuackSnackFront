
import { Carousel } from "solid-bootstrap"

function Home() {
  return (
    <div>
      <h1 class="page-title">Home page</h1>
      <div class="frame">
      <Carousel>
        <Carousel.Item>
          <div
            class="d-block w-100 bg-secondary d-flex justify-content-center align-items-center"
            style={{height:"50vh"}}
          >
            <img src="https://assets.afcdn.com/recipe/20161114/55392_w1024h576c1cx2808cy1872.jpg" alt="Cheeseburger" />
          </div>
          <Carousel.Caption>
            <h2>Cheeseburger</h2>
            <p>
              Nulla vitae elit libero, a pharetra augue mollis interdum.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div
            class="d-block w-100 bg-secondary d-flex justify-content-center align-items-center"
            style={{height:"50vh"}}
          >
            <img src="https://assets.afcdn.com/recipe/20161114/55392_w1024h576c1cx2808cy1872.jpg" alt="Cheeseburger" />
          </div>

          <Carousel.Caption>
            <h2>Second slide label</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div
            class="d-block w-100 bg-secondary d-flex justify-content-center align-items-center"
            style={{height:"50vh"}}
          >
            <img src="https://assets.afcdn.com/recipe/20161114/55392_w1024h576c1cx2808cy1872.jpg" alt="Cheeseburger" />
          </div>

          <Carousel.Caption>
            <h2>Third slide label</h2>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl
              consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel></div>
    </div>
  );
}

export default Home;
