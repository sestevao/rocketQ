const Database = require("../db/config");

module.exports = {
  async create(req, res) {
    const db = await Database();
    const pass = req.body.password;
    let roomId;
    let isRoom = true;

    while (isRoom) {
      /* Generate the room number */
      for (var i = 0; i < 6; i++) {
        i == 0
          ? (roomId = Math.floor(Math.random() * 10).toString())
          : (roomId += Math.floor(Math.random() * 10).toString());
      }

      /* Check if this room number already exists */
      const roomsExistsId = await db.all("SELECT id FROM rooms");
      isRoom = roomsExistsId.some((roomExistId) => roomExistId === roomId);

      if (!isRoom) {
        /* Insert the room in the db */
        await db.run(
          `INSERT INTO rooms(id, pass) VALUES(${parseInt(roomId)}, "${pass}")`
        );
      }
    }

    await db.close();

    console.log(pass, roomId);

    res.redirect(`/room/${roomId}`);
  },

  async open(req, res) {
    const db = await Database();
    const roomId = req.params.room;
    const questions = await db.all(
      `SELECT * FROM questions WHERE room=${roomId} and mark_read=0`
    );
    const questionsRead = await db.all(
      `SELECT * FROM questions WHERE room=${roomId} and mark_read=1`
    );
    let isNoQuestions;

    if (questions.length == 0) {
      if (questionsRead.length == 0) {
        isNoQuestions = true;
      }
    }

    res.render("room", {
      roomId: roomId,
      questions: questions,
      questionsRead: questionsRead,
      isNoQuestions: isNoQuestions,
    });

    await db.close();
  },

  enter(req, res) {
    const roomId = req.body.roomId;
    res.redirect(`/room/${roomId}`);
  },
};
