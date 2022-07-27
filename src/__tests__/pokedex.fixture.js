export default `<div class="app">
<div class="header">
    <h1>Pokedex</h1>
</div>

<div class="list" data-count="" data-numeric-items="1 2 3" data-page-number="1" data-next-page="" data-previous-page="">
    <div class="list-group">
        <p>Cargando...</p>
    </div>

    <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
            <li class="page-item disabled"><a class="page-link previous" href="#">Previous</a></li>

            <li class="page-item disabled"><a class="page-link start" href="#">...</a></li>
            
            <li class="page-item numeric active"><a class="page-link" href="#">1</a></li>
            <li class="page-item numeric"><a class="page-link" href="#">2</a></li>
            <li class="page-item numeric"><a class="page-link" href="#">3</a></li>

            <li class="page-item"><a class="page-link end" href="#">...</a></li>

            <li class="page-item"><a class="page-link next" href="#">Next</a></li>
        </ul>
    </nav>
</div>

<div id="card" class="card-pokemon invisible">
    <div class="name">
        <h3></h3>
    </div>

    <div class="detail">
        <div class="image">
            <img>
        </div>

        <div class="ability-info">
            <table>
                <tr>
                    <th>Altura</th>
                    <td> m</td>
                </tr>
                <tr>
                    <th>Peso</th>
                    <td> kg</td>
                </tr>
            </table>

            <div class="type"></div>
        </div>
    </div>
</div>
</div>`;
