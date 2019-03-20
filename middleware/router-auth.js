export default function({ store, redirect }) {
  if (store.state.user == 'logged-out' && store.state.signingOut == 'false') {
    return redirect('/login')
  }
}
