function RefreshTree() {
  DrawTree({
    Container: document.getElementById("dvTreeContainer"),
    RootNode: rootNode,
    Layout: 'Vertical',
    OnNodeClick: NodeClick,
    OnNodeDoubleClick: NodeClick
  })
}


function NodeClick() {
  if (this.Node.Nodes && this.Node.Nodes.length > 0) {
    collapse(this.Node.Level);
    this.Node.Collapsed = !this.Node.Collapsed;

    RefreshTree()
  }
}

function collapse(level) {
  nodes = document.getElementsByClassName('Node')

  for(var i = 0, node; node = nodes[i++];){
    if (node.Node.Level >= level)
      node.Node.Collapsed = true
  }
}

function ChangeLayout() {
  RefreshTree();
}

