export default async function({ route, redirect, store }) {
  let user = localStorage.getItem("user");
  if (!user) {
    const path = encodeURIComponent(route.path);
    return redirect(`/?r=${path}`);
  }
}
