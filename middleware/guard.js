export default async function({ $auth, redirect, store }) {
  let user = localStorage.getItem("user");
  if (user) {
    redirect("/stock-prices")
  }
}
