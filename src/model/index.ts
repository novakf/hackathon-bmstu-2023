export const WSconnect = (setMessage: any) => {
  let socket = new WebSocket("ws://172.20.10.9:3001");
  
  socket.onopen = function (e) {
    console.log("[open] Соединение установлено");
  };

  socket.onmessage = function (event) {
    setMessage(event.data)
  };

  socket.onclose = function (event) {
    if (event.wasClean) {
      console.log(
        `[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`
      );
    } else {
      // например, сервер убил процесс или сеть недоступна
      // обычно в этом случае event.code 1006
      console.log("[close] Соединение прервано");
    }
  };

  socket.onerror = function (error) {
    console.log(`[error]`);
  };
};
