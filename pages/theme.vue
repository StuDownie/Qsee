<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div>
          <h1 class="title">Theme</h1>
          <h2 class="subtitle">Example style components based on -</h2>
          <div class="buttons">
            <a
              class="button is-dark"
              target="_blank"
              href="https://buefy.github.io/documentation/customization"
            >Buefy</a>
            <a
              class="button is-dark"
              target="_blank"
              href="https://bulma.io/documentation/elements/"
            >Bulma</a>
            <a
              class="button is-dark"
              target="_blank"
              href="http://materialdesignicons.com"
            >Material icons</a>
            <a class="button is-dark" target="_blank" href="https://fontawesome.com">Font Awesome</a>
          </div>
        </div>
      </div>
    </section>

    <!-- <div class="container"> -->
    <section id="typography" class="section">
      <h1 class="title">Typography</h1>
      <hr>
      <div class="columns">
        <div class="column">
          <h1 class="title is-1">Title 1</h1>
          <h2 class="title is-2">Title 2</h2>
          <h3 class="title is-3">Title 3</h3>
          <h4 class="title is-4">Title 4</h4>
          <h5 class="title is-5">Title 5</h5>
          <h6 class="title is-6">Title 6</h6>
        </div>
        <div class="column">
          <h1 class="subtitle is-1">Subtitle 1</h1>
          <h2 class="subtitle is-2">Subtitle 2</h2>
          <h3 class="subtitle is-3">Subtitle 3</h3>
          <h4 class="subtitle is-4">Subtitle 4</h4>
          <h5 class="subtitle is-5">Subtitle 5</h5>
          <h6 class="subtitle is-6">Subtitle 6</h6>
        </div>
        <div class="column">
          <h1 class="title">Title</h1>
          <h2 class="subtitle">Subtitle</h2>
          <p class="title is-1">Title 1</p>
          <p class="subtitle is-3">Subtitle 3</p>
          <p class="title is-2">Title 2</p>
          <p class="subtitle is-4">Subtitle 4</p>
          <p class="title is-3">Title 3</p>
          <p class="subtitle is-5">Subtitle 5</p>
        </div>
      </div>
    </section>

    <section id="button" class="section">
      <h1 class="title">Buttons</h1>
      <hr>
      <div class="columns">
        <div class="column">
          <div class="buttons">
            <a class="button">Button</a>
            <a class="button is-white">White</a>
            <a class="button is-light">Light</a>
            <a class="button is-dark">Dark</a>
            <a class="button is-black">Black</a>
            <a class="button is-link">Link</a>
            <a class="button is-text">Link</a>
          </div>
          <div class="buttons">
            <a class="button is-primary">Primary</a>
            <a class="button is-info">Info</a>
            <a class="button is-success">Success</a>
            <a class="button is-warning">Warning</a>
            <a class="button is-danger">Danger</a>
          </div>
          <div class="buttons">
            <a class="button is-focused">Focus</a>
            <a class="button is-primary is-focused">Focus</a>
            <a class="button is-info is-focused">Focus</a>
            <a class="button is-success is-focused">Focus</a>
            <a class="button is-warning is-focused">Focus</a>
            <a class="button is-danger is-focused">Focus</a>
          </div>
          <div class="buttons">
            <a class="button is-hovered">Hover</a>
            <a class="button is-primary is-hovered">Hover</a>
            <a class="button is-info is-hovered">Hover</a>
            <a class="button is-success is-hovered">Hover</a>
            <a class="button is-warning is-hovered">Hover</a>
            <a class="button is-danger is-hovered">Hover</a>
          </div>
          <div class="buttons">
            <a class="button is-active">Active</a>
            <a class="button is-primary is-active">Active</a>
            <a class="button is-info is-active">Active</a>
            <a class="button is-success is-active">Active</a>
            <a class="button is-warning is-active">Active</a>
            <a class="button is-danger is-active">Active</a>
          </div>
          <div class="buttons">
            <a class="button is-loading">Loading</a>
            <a class="button is-primary is-loading">Loading</a>
            <a class="button is-info is-loading">Loading</a>
            <a class="button is-success is-loading">Loading</a>
            <a class="button is-warning is-loading">Loading</a>
            <a class="button is-danger is-loading">Loading</a>
          </div>
          <div class="buttons">
            <a class="button is-rounded">Rounded</a>
            <a class="button is-primary is-rounded">Rounded</a>
            <a class="button is-info is-rounded">Rounded</a>
            <a class="button is-success is-rounded">Rounded</a>
            <a class="button is-danger is-rounded">Rounded</a>
          </div>
        </div>
        <div class="column">
          <div class="buttons">
            <a class="button is-small">Small</a>
            <a class="button">Normal</a>
            <a class="button is-medium">Medium</a>
            <a class="button is-large">Large</a>
          </div>
          <div class="buttons">
            <a class="button is-outlined">Outlined</a>
            <a class="button is-primary is-outlined">Outlined</a>
            <a class="button is-info is-outlined">Outlined</a>
            <a class="button is-success is-outlined">Outlined</a>
            <a class="button is-danger is-outlined">Outlined</a>
          </div>
          <div class="buttons notification is-primary">
            <a class="button is-primary is-inverted">Inverted</a>
            <a class="button is-info is-inverted">Inverted</a>
            <a class="button is-success is-inverted">Inverted</a>
            <a class="button is-danger is-inverted">Inverted</a>
          </div>
          <div class="buttons notification is-primary">
            <a class="button is-primary is-inverted is-outlined">Both</a>
            <a class="button is-info is-inverted is-outlined">Both</a>
            <a class="button is-success is-inverted is-outlined">Both</a>
            <a class="button is-danger is-inverted is-outlined">Both</a>
          </div>
          <p class="buttons">
            <a class="button is-small">
              <span class="icon is-small">
                <b-icon icon="github-circle"/>
              </span>
              <span>GitHub</span>
            </a>
            <a class="button">
              <span class="icon">
                <b-icon icon="github-circle"/>
              </span>
              <span>GitHub</span>
            </a>
            <a class="button is-medium">
              <span class="icon">
                <b-icon icon="github-circle"/>
              </span>
              <span>GitHub</span>
            </a>
            <a class="button is-large">
              <span class="icon is-medium">
                <b-icon icon="github-circle"/>
              </span>
              <span>GitHub</span>
            </a>
          </p>
        </div>
      </div>
    </section>

    <section id="content" class="section">
      <h1 class="title">Sample content</h1>
      <hr>
      <div class="content">
        <h1>Hello World</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis neque.</p>
        <h2>Second level</h2>
        <p>
          Curabitur accumsan turpis pharetra
          <strong>augue tincidunt</strong> blandit. Quisque condimentum maximus mi, sit amet commodo arcu rutrum id. Proin pretium urna vel cursus venenatis. Suspendisse potenti. Etiam mattis sem rhoncus lacus dapibus facilisis. Donec at dignissim dui. Ut et neque nisl.
        </p>
        <ul>
          <li>In fermentum leo eu lectus mollis, quis dictum mi aliquet.</li>
          <li>Morbi eu nulla lobortis, lobortis est in, fringilla felis.</li>
          <li>Aliquam nec felis in sapien venenatis viverra fermentum nec lectus.</li>
          <li>Ut non enim metus.</li>
        </ul>
        <h3>Third level</h3>
        <p>
          Quisque ante lacus, malesuada ac auctor vitae, congue
          <a href="#">non ante</a>. Phasellus lacus ex, semper ac tortor nec, fringilla condimentum orci. Fusce eu rutrum tellus.
        </p>
        <ol>
          <li>Donec blandit a lorem id convallis.</li>
          <li>Cras gravida arcu at diam gravida gravida.</li>
          <li>Integer in volutpat libero.</li>
          <li>Donec a diam tellus.</li>
        </ol>
        <blockquote>Ut venenatis, nisl scelerisque sollicitudin fermentum, quam libero hendrerit ipsum, ut blandit est tellus sit amet turpis.</blockquote>
        <p>
          Quisque at semper enim, eu hendrerit odio. Etiam auctor nisl et
          <em>justo sodales</em> elementum. Maecenas ultrices lacus quis neque consectetur, et lobortis nisi molestie.
        </p>
        <p>Sed sagittis enim ac tortor maximus rutrum. Nulla facilisi. Donec mattis vulputate risus in luctus. Maecenas vestibulum interdum commodo.</p>
        <p>Suspendisse egestas sapien non felis placerat elementum. Morbi tortor nisl, suscipit sed mi sit amet, mollis malesuada nulla. Nulla facilisi. Nullam ac erat ante.</p>
      </div>
    </section>
    <section class="section">
      <h1 class="title">Form elements</h1>
      <div class="columns">
        <div class="column"/>
        <div class="column box">
          <div class="block">
            <b-field>
              <b-datepicker v-model="date" :first-day-of-week="1" placeholder="Date picker">
                <div class="buttons">
                  <button class="button is-primary" @click="date = new Date()">
                    <b-icon icon="calendar-today"/>
                    <span>Today</span>
                  </button>
                  <button class="button is-danger" @click="date = null">
                    <b-icon icon="close"/>
                    <span>Clear</span>
                  </button>
                </div>
              </b-datepicker>
            </b-field>

            <b-field>
              <b-input placeholder="Field"/>
            </b-field>

            <b-field>
              <b-input placeholder="Rounded" rounded/>
            </b-field>

            <b-field>
              <b-input placeholder="Disabled" disabled/>
            </b-field>

            <b-field>
              <b-input placeholder="Loading" loading/>
            </b-field>

            <b-field>
              <b-input placeholder="Search..." type="search" icon="magnify"/>
            </b-field>

            <b-field>
              <b-input placeholder="Email" type="email" icon="email"/>
            </b-field>

            <b-field>
              <b-input placeholder="Credit card" icon="credit-card"/>
            </b-field>

            <b-field>
              <b-select placeholder="Country" icon="earth">
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
              </b-select>
            </b-field>
          </div>
        </div>
        <div class="column">
          <div class="block">
            <b-radio v-model="radio" native-value="John">John</b-radio>
            <b-radio v-model="radio" native-value="Paul">Paul</b-radio>
            <b-radio v-model="radio" native-value="George">George</b-radio>
            <b-radio v-model="radio" native-value="Ringo" disabled>Ringo</b-radio>
          </div>
          <div class="block">
            <b-field>
              <b-radio-button v-model="radioButton" native-value="Nope" type="is-danger">
                <b-icon icon="close"/>
                <span>Nope</span>
              </b-radio-button>

              <b-radio-button v-model="radioButton" native-value="Yep" type="is-success">
                <b-icon icon="check"/>
                <span>Yep</span>
              </b-radio-button>

              <b-radio-button v-model="radioButton" native-value="Default">Default</b-radio-button>

              <b-radio-button v-model="radioButton" native-value="Disabled" disabled>Disabled</b-radio-button>
            </b-field>
          </div>
          <div class="block">
            <div class="field">
              <b-switch :value="true">Default</b-switch>
            </div>
            <div class="field">
              <b-switch :value="true" type="is-info">Info</b-switch>
            </div>
            <div class="field">
              <b-switch :value="true" type="is-success">Success</b-switch>
            </div>
            <div class="field">
              <b-switch :value="true" type="is-danger">Danger</b-switch>
            </div>
            <div class="field">
              <b-switch :value="true" type="is-warning">Warning</b-switch>
            </div>
          </div>
          <div class="block">
            <div class="field">
              <b-checkbox :value="true">Default</b-checkbox>
            </div>
            <div class="field">
              <b-checkbox :value="true" type="is-info">Info</b-checkbox>
            </div>
            <div class="field">
              <b-checkbox :value="true" type="is-success">Success</b-checkbox>
            </div>
            <div class="field">
              <b-checkbox :value="true" type="is-danger">Danger</b-checkbox>
            </div>
            <div class="field">
              <b-checkbox :value="true" type="is-warning">Warning</b-checkbox>
            </div>
          </div>
        </div>
        <div class="column"/>
      </div>
    </section>

    <!-- </div> -->
  </div>
</template>
<script>
export default {
  layout: 'display',
  data() {
    return {
      radio: 'Jack',
      radioButton: '',
      date: new Date()
    }
  }
}
</script>
