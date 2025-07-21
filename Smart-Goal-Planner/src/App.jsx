import React, {useState, useEffect} from 'react';

function App(){
  const [goals, setGoals] = useState([]);
  const[name, setName] = useState("");
  const[targetAmount, setTargetAmount] = useState("");
  const[savedAmount, setSavedAmount] = useState("");
  const[category, setCategory] = useState("");
  const[deadline, setDeadline] = useState("");
  const[createdAt, setCreatedAt] = useState("");
  const[body, setBody] = useState("")
  const[editingGoal, setEditingGoal]= useState("")

  useEffect(() =>{
    fetch("http://localhost:3001/goals")
    .then((res) => res.json())
    .then((data) =>setGoals(data))
  },[]);

  function handleSubmit(e){
    e.preventDefault();
    const newGoal={name,targetAmount,savedAmount,category,deadline,createdAt,body};

    fetch("http://localhost:3001/goals",{
      method: "POST",
      headers: {"Content-Type": "application/json"

      },
      body: JSON.stringify(newGoal)

    })
    .then((res) => res.json())
    .then((data) =>{
      setGoals([...goals,data]);
      setName("");
      setTargetAmount("");
      setSavedAmount("");
      setCategory("");
      setDeadline("");
      setCreatedAt("");
      setBody("");
    });
  }

  function handleDelete(id){
    fetch(`http://localhost:3001/goals/${id}`,{
      method: "DELETE"
    })
    .then((res) =>{
      const updateGoals = goals.filter(goal =>goal.id !== id);
      setGoals(updateGoals);
  })

  function handleEdit(goal){
    setEditingGoal(goal);
    setName(goal.name);
    setTargetAmount(goal.targetAmount);
    setSavedAmount(goal.savedAmount);
    setCategory(goal.category);
    setDeadline(goal.deadline);
  }
  


  }
    
  return (
    <div>
      <h1>Smart Goal Planner</h1>

      {/* Display goals */}
      {goals.map((goal) => (
        <div key={goal.id}>
          <strong>{goal.name}</strong>
          <div>Target: {goal.targetAmount}</div>
          <div>Saved: {goal.savedAmount}</div>
          <div>Category: {goal.category}</div>
          <div>Deadline: {goal.deadline}</div>
          <div>Created: {goal.createdAt}</div>
          <p>{goal.body}</p>
          <button onClick={() => handleEdit(goal)}>Edit</button>
          <button onClick={() => handleDelete(goal.id)}>Delete</button>
        </div>
      ))}

      {/* Add new goal form */}
      <form onSubmit={handleSubmit}>
        <h2>Add a new Goal</h2>
        <input
          type="text"
          placeholder="Goal name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Goal Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <input
          type="number"
          placeholder="Target amount"
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
        />
        <input
          type="number"
          placeholder="Saved amount"
          value={savedAmount}
          onChange={(e) => setSavedAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="date"
          placeholder="Deadline"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <input
          type="date"
          placeholder="Created"
          value={createdAt}
          onChange={(e) => setCreatedAt(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;