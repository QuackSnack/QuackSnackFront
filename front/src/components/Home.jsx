
import { Carousel } from "solid-bootstrap"

function Home() {
  return (
    <div>
      <h1 class="page-title">Welcome to Food Distribution</h1>
      <div class="frame">
        <Carousel fade pause="hover">
          <Carousel.Item>
            <div
              class="d-block w-100 bg-secondary d-flex justify-content-center align-items-center"
              style={{ height: "50vh", width: "50vw" }}
            >
              <img src="https://assets.afcdn.com/recipe/20161114/55392_w1024h576c1cx2808cy1872.jpg" alt="Cheeseburger" />
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div
              class="d-block w-100 bg-secondary d-flex justify-content-center align-items-center"
              style={{ height: "50vh", width: "50vw" }}
            >
              <img src="https://assets.afcdn.com/recipe/20180725/81569_w1200h628c1.jpg" alt="Ribs" />
            </div>

          </Carousel.Item>
          <Carousel.Item>
            <div
              class="d-block w-100 bg-secondary d-flex justify-content-center align-items-center"
              style={{ height: "50vh", width: "50vw" }}
            >
              <img src="https://fac.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Ffac.2F2019.2F01.2F03.2F9bdc34bd-6233-45cb-986e-df99523545f0.2Ejpeg/1200x600/quality/80/crop-from/center/tacos-ces-sandwichs-hypercaloriques-sont-il-pires-que-des-burgers.jpeg" alt="Tacos" />
            </div>

          </Carousel.Item>
          <Carousel.Item>
            <div
              class="d-block w-100 bg-secondary d-flex justify-content-center align-items-center"
              style={{ height: "50vh", width: "50vw" }}
            >
              <img src="https://www.radiocontact.be/app/uploads/2021/08/ppp.jpg" alt="Pizza" />
            </div>

          </Carousel.Item>
        </Carousel></div>
    </div>
  );
}

export default Home;
