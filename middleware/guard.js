export default async function({ $auth, redirect, store }) {
  let user = store.state.user;
  if (user) {
    redirect("/stock-prices")
  }
}
