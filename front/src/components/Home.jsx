
import { Carousel } from "solid-bootstrap"

function Home() {
  return (
    <div>
      <h1 class="page-title">Welcome to Food Distribution</h1>
      <div class="frame">
        <Carousel variant="dark">
          <Carousel.Item>
            <div
              class="d-block w-100 bg-secondary d-flex justify-content-center align-items-center"
              style={{ height: "50vh" }}
            >
              <img src="https://assets.afcdn.com/recipe/20161114/55392_w1024h576c1cx2808cy1872.jpg" alt="Cheeseburger" />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div
              class="d-block w-100 bg-secondary d-flex justify-content-center align-items-center"
              style={{ height: "50vh" }}
            >
              <img src="https://assets.afcdn.com/recipe/20161114/55392_w1024h576c1cx2808cy1872.jpg" alt="Cheeseburger" />
            </div>

          </Carousel.Item>
          <Carousel.Item>
            <div
              class="d-block w-100 bg-secondary d-flex justify-content-center align-items-center"
              style={{ height: "50vh" }}
            >
              <img src="https://assets.afcdn.com/recipe/20161114/55392_w1024h576c1cx2808cy1872.jpg" alt="Cheeseburger" />
            </div>

          </Carousel.Item>
        </Carousel></div>
    </div>
  );
}

export default Home;
