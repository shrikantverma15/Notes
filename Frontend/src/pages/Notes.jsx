import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Notes() {
  const navigate = useNavigate()
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchNotes = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("https://devnotes-m111.onrender.com/note", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setNotes(data.notes || []);
    } catch (error) {
      alert(`An error occurred while fetching notes: ${error}`);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await fetch(`https://devnotes-m111.onrender.com/note/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchNotes();
    } catch (error) {
      alert(`Error deleting note: ${error}`);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    setLoading(true);

    try {
      const response = await fetch(
        "https://devnotes-m111.onrender.com/note/create",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, content, status: true }), // Set status to true
        }
      );
      const data = await response.json();
      if (response.ok) {
        setTitle("");
        setContent("");
        fetchNotes();
        alert("Note added successfully!");
      } else {
        alert(`Failed to add note: ${data.message}`);
      }
    } catch (error) {
      alert(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id) => {
    const token = localStorage.getItem("token");

    // Get the updated title and content (you can add more fields as needed)
    const updatedTitle = prompt("Enter updated title:", "");
    const updatedContent = prompt("Enter updated content:", "");

    if (!updatedTitle || !updatedContent) {
      alert("Both title and content are required to update.");
      return;
    }

    try {
      const response = await fetch(
        `https://devnotes-m111.onrender.com/note/update/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: updatedTitle,
            content: updatedContent,
            status: true, // Assuming the status stays true
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        fetchNotes(); // Refresh the notes after successful update
        alert("Note updated successfully!");
      } else {
        alert(`Failed to update note: ${data.message}`);
      }
    } catch (error) {
      alert(`Error updating note: ${error}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login")
    
    
  };
  return (
    <div style={styles.container}>

      <button onClick={handleLogout}>logout</button>

      <h1 style={styles.header}>Notes</h1>

      <form onSubmit={handleAddNote} style={styles.form}>
        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={styles.input}
        />
        <textarea
          placeholder="Note Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          style={styles.textarea}
        />
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Adding..." : "Add Note"}
        </button>
      </form>

      {Array.isArray(notes) && notes.length > 0 ? (
        <div style={styles.notesContainer}>
          {notes.map((note) => (
            <div key={note._id} style={styles.noteCard}>
              <h2 style={styles.noteTitle}>{note.title}</h2>
              <p style={styles.noteContent}>{note.content}</p>
              <div style={styles.noteActions}>
                <button
                  onClick={() => handleUpdate(note._id)}
                  style={styles.noteActionButton}
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(note._id)}
                  style={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2>No notes to display</h2>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    height: "100vh",
    padding: "20px",
    backgroundColor: "#f4f7fc",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    fontFamily: "'Arial', sans-serif",
  },
  header: {
    fontSize: "36px",
    fontWeight: "600",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    width: "30%",
    minWidth: "300px",
    marginBottom: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ddd",
  },
  textarea: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    minHeight: "200px",
    minWidth: "240px", // Increased the minHeight to make it bigger
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#4CAF50",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  notesContainer: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
  },
  noteCard: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  noteTitle: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "10px",
  },
  noteContent: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "20px",
  },
  noteActions: {
    display: "flex",
    justifyContent: "space-between",
  },
  noteActionButton: {
    padding: "8px 16px",
    fontSize: "14px",
    color: "#fff",
    backgroundColor: "#007BFF",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "8px 16px",
    fontSize: "14px",
    color: "#fff",
    backgroundColor: "#FF5733",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
