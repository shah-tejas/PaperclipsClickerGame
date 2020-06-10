let paperclips = 0;
let clippers = 0;
let paperclips_output;
let clippers_output;

function initialSetup() {
    if(!paperclips_output) {
        paperclips_output = document.getElementById("paperclips_output");
    }
    if(!clippers_output) {
        clippers_output = document.getElementById("clippers_output");
    }
    // render the first loop
    render();

    // loop
    setInterval(() => {
        update()
        render();
    }, 500) // 500ms = twice a second
}

function make() {
  paperclips++;
  render();
}

function buy() {
  if (paperclips >= 5) {
    paperclips -= 5;
    clippers++;
    render();
  }
}

function render() {
  paperclips_output.innerHTML = paperclips;
  clippers_output.innerHTML = clippers;
}

function update() {
  if (clippers) {
    paperclips += clippers;
  }
}
