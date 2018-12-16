import React from 'react';
import PropTypes from 'prop-types';
import IPropTypes from 'react-immutable-proptypes';
import Autobind from 'common/autobind-component';
import { Route } from 'react-router-dom';
import SubReddit from 'examples/subreddit';
import styles from './index.scss';

class Dashboard extends Autobind {
  componentDidMount() {
    this.props.fetchSubReddits();
  }

  onChangeSubreddit(e) {
    return this.props.push(`/r/${e.target.value}`);
  }

  render() {
    const { subReddits, t, match, location } = this.props;

    if (!subReddits) {
      return <div>Loading</div>;
    }

    const pathPieces = location.pathname.split('/').filter(i => i);
    const currentSubReddit =
      pathPieces.length > 1 && pathPieces[0] === 'r' ? pathPieces[1] : null;

    return (
      <div className={styles.dashboardWrapper}>
        <label>{t('dashboard:popular_subreddits')}</label>
        <select
          onChange={this.onChangeSubreddit}
          value={currentSubReddit || ''}
        >
          <option value={''} label={t('dashboard:select_subreddit')} />
          {subReddits.map((item, i) => (
            <option key={`${i}-${item}`} value={item} label={item} />
          ))}
        </select>
        <br />
        <label>{t('dashboard:enter_your_own')}</label>
        <input type='text' onBlur={this.onChangeSubreddit} />
        <Route path={`${match.url}r/:srName`} component={SubReddit} />
      </div>
    );
  }
}

Dashboard.propTypes = {
  t: PropTypes.func.isRequired,
  subReddits: IPropTypes.listOf(PropTypes.string),
  push: PropTypes.func.isRequired,
  fetchSubReddits: PropTypes.func.isRequired,
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Dashboard;
