import { API } from '../constants';
import ajax from '../utils/ajax';

export function getHomeTimeline(params) {
  return ajax.get(`${API}/2/statuses/home_timeline.json`, { params });
}

export function getPublicTimeline(params) {
  return ajax.get(`${API}/2/statuses/public_timeline.json`, { params });
}

export function getPost(params) {
  return ajax.get(`${API}/2/statuses/show.json`, { params });
}

export function addPost(body) {
  return ajax.post(`${API}/2/statuses/create.json`, body, { headers: { 'Content-Type': 'application/json' } });
}
