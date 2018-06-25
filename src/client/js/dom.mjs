const select = (...args) => document.querySelector(...args);

const selectAll = (...args) => {
  let list = document.querySelectorAll(...args),
    array = [];
  for (let node of list) {
    array.push(node);
  }
  return array;
}

const create = (...args) => document.createElement(...args);

const fromHtml = (html) => {
  let templateElement = create(`template`);
  templateElement.innerHTML = html.trim();
  return templateElement.content.firstElementChild;
};

const $ = {
  select,
  selectAll,
  create,
  fromHtml
};

export default $;
