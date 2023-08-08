import React, { useState } from "react";
import "./index.css";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

const App = () => {
  const [showAddFriend, setShowAddFriend] = useState(false);
  // yeni yarattığımız newFriend için state
  const [friends, setFriends] = useState(initialFriends);

  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleSelection = (friend) => {
    setSelectedFriend((selectedFriend) =>
      // burada select yaptığımızda close dönüşüp tekrar ilk haline dönmesi için
      selectedFriend.id === friend.id ? "null" : friend
    );
    // setSelectedFriend((current) =>
    //   current?.id === friend.id ? "null" : friend
    // );
    setShowAddFriend(false);
  };

  // newFriend eklediğimiz fonksiyon
  const handleAddFriend = (friend) => {
    setFriends((friends) => [...friends, friend]);
  };

  //yeni arkadaş ekleme butonuna bastığımızda açılmasını sağlar.
  const handleShowFriend = () => {
    // FormAddFriend'in Buttona tıklandığunda açılabilmesi için state ayarlandı.
    // setShowAddFriend(!showAddFriend); bu şekilde de olabilir ancak callback kullanmak çok daha iyi
    setShowAddFriend((show) => !show);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />
        {/* Burda add friend butonuna bastığımızda FormAddFriend componentini gösterir */}
        {showAddFriend && <FormAddFriend handleAddFriend={handleAddFriend} />}
        <Button onClick={handleShowFriend}>
          {/* Butondaki textin değişmesi için state kullanıldı */}
          {showAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>
      {/* Form Split seçilmezse açılmaması için null and operatörüyle kısa devre yapar ve sağ taraf çalışır */}
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} />}
    </div>
  );
};

export default App;

const FriendsList = ({ friends, onSelection, selectedFriend }) => {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        ></Friend>
      ))}
    </ul>
  );
};

const Friend = ({ friend, onSelection, selectedFriend }) => {
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <>
      <li className={isSelected ? "selected" : ""}>
        <img src={friend.image} alt={friend.name} />
        <h3>{friend.name}</h3>

        {friend.balance < 0 && (
          <p className="red">
            You owe {friend.name} {Math.abs(friend.balance)}$
          </p>
        )}

        {friend.balance > 0 && (
          <p className="green">
            {friend.name}owes you {Math.abs(friend.balance)}$
          </p>
        )}
        {friend.balance === 0 && <p>You and {friend.name} are even</p>}
        <Button onClick={() => onSelection(friend)}>
          {/* Butonun üzerindeki ifadeyi değiştirmek için */}
          {isSelected ? "Close" : "Select"}
        </Button>
      </li>
    </>
  );
};

const Button = ({ children, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};

const FormAddFriend = ({ handleAddFriend }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  const handleSubmit = (e) => {
    e.preventDefault();

    // eğer if ve image yoksa döndür
    if (!name || !image) return;

    const id = crypto.randomUUID();
    //yeni bir friend eklemek için
    const newFriend = {
      name,
      image: `${image}?=$${id}`,
      id,
      balance: 0,
    };

    handleAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  };
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label htmlFor="">👭Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor=""> 👭 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button> Add</Button>
    </form>
  );
};

const FormSplitBill = ({ selectedFriend }) => {
  return (
    <form className="form-split-bill">
      <h2 htmlFor="">SPLİT A BILL WİTH {selectedFriend.name}</h2>

      <label htmlFor="">💰 Bill value</label>
      <input type="text" />

      <label htmlFor=""> 🙎‍♂️Your expense</label>
      <input type="text" />

      <label htmlFor="">👭 {selectedFriend.name} expense</label>
      <input type="text" />

      <label htmlFor="">Who is paying the bill</label>
      <select name="" id="">
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
};
