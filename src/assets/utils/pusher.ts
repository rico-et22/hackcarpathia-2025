import Pusher from "pusher-js";
// move credentials into .env file
const pusher = new Pusher(import.meta.env.PUSHER_KEY, {
  cluster: "eu",
  forceTLS: true,
});

export default pusher;
