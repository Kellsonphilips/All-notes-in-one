import List "mo:base/List";
import Debug "mo:base/Debug";




actor OneNote{

  public type Note = {
    title: Text;
    content: Text;
  };

  stable var notes: List.List<Note> = List.nil<Note>();

// Applying CRUD
// Ceate
  public func createNote(titleText: Text, contentText: Text) {

    var newNote: Note = {
      title = titleText;
      content = contentText;
    };

    notes := List.push(newNote, notes);
    Debug.print(debug_show(notes));
  };

// Read
  public query func readNote(): async [Note] {
    return List.toArray(notes);
  };

  // Update and Delete

  public func removeNote(index: Nat) {

    let listFront = List.take(notes, index);
    let listBack = List.drop(notes, index + 1);
    notes := List.append(listFront, listBack);
  };
  
}
