import Slider from 'react-slider-modal';
import { Button } from 'components';
import 'animate.css/animate.min.css';
import './Flyout.scss';

const Flyout = ({ slideShow, setSlideShow, details }) => {
  function summaryMarkup() {
    return { __html: details.summary };
  }

  return (
    <>
      <Slider
        id="flyout"
        speed="fast"
        animation="slide"
        closeIcon={(e) => {
          setSlideShow(e);
        }}
        size="small"
        toggle={slideShow}
        closeModal={() => {
          setSlideShow(false);
        }}
        direction="right"
        className="slider-style"
      >
        <div className="slider-container">
          <div className="sliderHeader header" data-testid="flyout-title">
            {details.name}
          </div>
          <div className="sliderBody">
            <header>
              <img src={details?.image?.medium} alt={details.name} />
              <h2 data-testid="flyout-header">{details.name}</h2>
            </header>
            <section>
              <h5 data-testid="flyout-summary">Summary</h5>
              <div
                data-testid="flyout-summary-desc"
                className="summary"
                dangerouslySetInnerHTML={summaryMarkup()}
              />
              <h5>Genres</h5>
              <div data-testid="flyout-genres">
                {details.genres?.map((gen) => (
                  <Button key={gen} type="outline">
                    {gen}
                  </Button>
                ))}
              </div>

              <h5>Details</h5>
              <dl>
                <dt>Rating</dt>
                <dd>{details.rating?.average}</dd>

                <dt>Status</dt>
                <dd>{details.status}</dd>

                <dt>Start Date</dt>
                <dd>{details.premiered}</dd>

                <dt>End Date</dt>
                <dd>{details.ended}</dd>

                <dt>Language</dt>
                <dd>{details.language}</dd>

                <dt>Official Site</dt>
                <dd>
                  <a
                    className="link"
                    href={details.officialSite}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {details.officialSite}
                  </a>
                </dd>
              </dl>
            </section>
          </div>
          <div className="sliderFooter">
            <Button
              data-testid="cancel-button"
              onClick={() => setSlideShow(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Slider>
    </>
  );
};

export default Flyout;
