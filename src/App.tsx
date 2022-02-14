import FacebookIcon from './facebook.svg';
import './index.css';
import InstagramIcon from './instagram.png';

const App = () => {
  return (
    <div>
      <h1>React Typescript Webpack Starter Template</h1>
      <img src={FacebookIcon} alt='image' />
      <img src={InstagramIcon} alt='image' />
    </div>
  );
};

export { App };
