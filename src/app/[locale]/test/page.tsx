export default function TestPage(): React.JSX.Element {
  throw new Error('This is a render-time error!');
  return <div>You won see this</div>;
}
