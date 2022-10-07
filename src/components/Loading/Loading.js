import PropTypes from 'prop-types';
import { BallTriangle } from 'react-loading-icons';

import './Loading.scss';

export default function Loading({ isLoading }) {
  if (!isLoading) return <></>;
  return (
    <div className="loading_element">
      <BallTriangle stroke="#f56b3f" />
      <span>Loading...</span>
    </div>
  );
}

Loading.defaultProps = {
  isLoading: false,
};

Loading.propTypes = {
  isLoading: PropTypes.bool,
};
