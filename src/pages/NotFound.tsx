import ErrorView from '../components/common/ErrorView';

export default function NotFound() {
  return <ErrorView code={'404'} message={'페이지를 찾을 수 없습니다.'} />;
}
