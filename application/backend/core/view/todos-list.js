<todo-list>

  <ul>
    <li each={tasks}>
      {title}
    </li>
  </ul>

  <script>
    this.tasks = [
      {title: 'title 1', ready: false}
      ,{title: 'title 2', ready: false}
    ]
  </script>

</todo-list>
