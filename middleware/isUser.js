export default async function({ route, redirect, store }) {
  let user = store.state.user;
  if (!user) {
    const path = encodeURIComponent(route.path);
    return redirect(`/?r=${path}`);
  }
}
