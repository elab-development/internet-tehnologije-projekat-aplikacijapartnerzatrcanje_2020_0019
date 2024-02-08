import React, { useState, useEffect } from 'react';
import { apiService } from './ApiService';
import './Comments.css';
import { Button } from './Button';
import Swal from 'sweetalert2';

const Comments = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await apiService.getComments();
        setComments(response.data);
      } catch (error) {
        console.error('Greška pri dohvatanju komentara:', error);
      }
    };

    fetchComments();
  }, []);

  const handleDeleteComment = async (commentId) => {
    try {
      await apiService.deleteComment(commentId);
      setComments((prevComments) => prevComments.filter((comment) => comment.ID !== commentId));
      Swal.fire({
        icon: 'success',
        title: 'Uspešno uklonjen komentar!',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error('Greška pri brisanju komentara:', error);
    }
  };


  return (
    <div className="comments-run-container">
      <h2>Komentari</h2>
      <table className="comments-table">
        <thead>
          <tr>
            <th style={{ color: 'white' }}>Plan trke ID</th>
            <th style={{ color: 'white' }}>Trkač</th>
            <th style={{ color: 'white' }}>Komentar</th>
            <th style={{ color: 'white' }}>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr key={comment.ID}>
              <td style={{ color: 'white' }}>{comment.Plan_trke.id}</td>
              <td style={{ color: 'white' }}>{comment.Trkac.ime} {comment.Trkac.prezime}</td>
              <td style={{ color: 'white' }}>{comment.Tekst}</td>


              <td>
                <Button
                  type="button"
                  onClick={() => handleDeleteComment(comment.ID)}
                  buttonStyle="btn--outline"
                  buttonSize="btn--medium"
                >
                  Obriši komentar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="background-behind-container"></div>
    </div>
  );
};

export default Comments;
