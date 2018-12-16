const REDDIT_API_URL = 'https://www.reddit.com';
const IMGUR_API_URL = 'https://api.imgur.com';
const IMGUR_CLIENT_ID = '5c0f266f37fd44e';

const request = ({
  host = REDDIT_API_URL,
  endpoint,
  body,
  method = 'GET',
  headers,
}) => {
  const params = {
    body: body ? JSON.stringify(body) : undefined,
    method,
    headers: headers ? new Headers(headers) : undefined,
  };

  return fetch(`${host}/${endpoint}`, params).then(res => res.json());
};

/*
  Not actually a reddit endpoint; just want an example of file upload in here.
*/
export const uploadExample = parmas => {
  return request({
    host: IMGUR_API_URL,
    endpoint: '3/image',
    body: parmas,
    method: 'POST',
    headers: {
      Authorization: `Client-Id ${IMGUR_CLIENT_ID}`,
      'Content-Type': 'application/json',
    },
  });
};

export const fetchTopSubrredits = () => {
  return request({ endpoint: 'api/trending_subreddits.json' }).then(
    res => res.subreddit_names
  );
};

export const fetchRedditPosts = ({ type = 'top', name }) => {
  if (!name) {
    return Promise.reject('Cannot fetch posts; no name provided');
  }

  return request({ endpoint: `/r/${name}/${type}.json` }).then(res =>
    res.data.children.map(item => item.data)
  );
};
