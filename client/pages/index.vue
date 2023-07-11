<template >
  <div style="background: #E3E3EE">

    <br/>

<br>
<br>
<br>
      <div>
            <addBook  />
      </div>
      <br>
      <div>
            <Book />
      </div>

  </div>
</template>

<script>
import Book from '~/components/Book.vue'
import addBook from '~/components/addBook.vue'
export default {


   components: {
    Book,
    addBook
  }
}

</script>

<style>
#carousel__title {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 5px 5px 0 0;
  padding: 0.5em;
  margin: 0 auto;
  bottom: 50px;
  left: 0;
  right: 0;
}


* {
text-align: center;
}

h1 {
  padding: 20px;
}
</style>
