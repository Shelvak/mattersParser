function DrawTree(n){PrepareNode(n.RootNode),n.Layout=="Vertical"?PerformLayoutV(n.RootNode):PerformLayoutH(n.RootNode),n.Container.innerHTML="",DrawNode(n.RootNode,n.Container,n),DrawLines(n.RootNode,n.Container)}function DrawLines(n,t){if(!n.Collapsed&&n.Nodes&&n.Nodes.length>0)for(var i=0;i<n.Nodes.length;i++)n.ChildrenConnectorPoint.Layout=="Vertical"?DrawLineV(t,n.ChildrenConnectorPoint,n.Nodes[i].ParentConnectorPoint):DrawLineH(t,n.ChildrenConnectorPoint,n.Nodes[i].ParentConnectorPoint),DrawLines(n.Nodes[i],t)}function DrawLineH(n,t,i){var r=t.Y+(i.Y-t.Y)/2,f,u;DrawLineSegment(n,t.X,t.Y,t.X,r,1),f=t.X<i.X?t.X:i.X,u=t.X>i.X?t.X:i.X,DrawLineSegment(n,f,r,u,r,1),DrawLineSegment(n,i.X,r,i.X,i.Y,1)}function DrawLineV(n,t,i){var r=t.X+(i.X-t.X)/2,f,u;DrawLineSegment(n,t.X,t.Y,r,t.Y,1),f=t.Y<i.Y?t.Y:i.Y,u=t.Y>i.Y?t.Y:i.Y,DrawLineSegment(n,r,f,r,u,1),DrawLineSegment(n,r,i.Y,i.X,i.Y,1)}function DrawLineSegment(n,t,i,r,u,f){var e=document.createElement("div");e.style.top=i+"px",e.style.left=t+"px",t==r?(e.style.width=f+"px",e.style.height=u-i+"px"):(e.style.width=r-t+"px",e.style.height=f+"px"),e.className="NodeLine",n.appendChild(e)}function DrawNode(n,t,i){var r=document.createElement("div"),u;r.style.top=n.Top+"px",r.style.left=n.Left+"px",r.style.width=n.Width+"px",r.style.height=n.Height+"px",r.className=n.Collapsed?"NodeCollapsed":"Node",n.Class&&(r.className=n.Class),n.Content&&(r.innerHTML="<div class='NodeContent'>"+n.Content+"</div>"),n.ToolTip&&r.setAttribute("title",n.ToolTip),r.Node=n,i.OnNodeClick&&(r.onclick=i.OnNodeClick),i.OnNodeDoubleClick&&(r.ondblclick=i.OnNodeDoubleClick),t.appendChild(r);if(!n.Collapsed&&n.Nodes&&n.Nodes.length>0)for(u=0;u<n.Nodes.length;u++)DrawNode(n.Nodes[u],t,i)}function PerformLayoutV(n){var i=30,o=100,l=50,s=30,t=0,f,h,e,c,u,r;if(!n.Collapsed&&n.Nodes&&n.Nodes.length>0)for(f=0;f<n.Nodes.length;f++)PerformLayoutV(n.Nodes[f]);!n.Collapsed&&n.Nodes&&n.Nodes.length>0?(h=n.Nodes[n.Nodes.length-1].Top+n.Nodes[n.Nodes.length-1].Height-n.Nodes[0].Top,t=n.Nodes[0].Top+h/2-i/2,n.LeftNode&&n.LeftNode.Top+n.LeftNode.Height+s>t&&(e=n.LeftNode.Top+n.LeftNode.Height+s,c=e-t,MoveBottom(n.Nodes,c),t=e)):n.LeftNode&&(t=n.LeftNode.Top+n.LeftNode.Height+s),n.Top=t,n.Left=l*(n.Level+1)+o*(n.Level+1),n.Height=i,n.Width=o,u=n.Left+o,r=t+i/2,n.ChildrenConnectorPoint={X:u,Y:r,Layout:"Vertical"},u=n.Left,r=t+i/2,n.ParentConnectorPoint={X:u,Y:r,Layout:"Vertical"}}function PerformLayoutH(n){var o=30,f=100,e=30,l=50,t=0,i,h,s,c,r,u;if(!n.Collapsed&&n.Nodes&&n.Nodes.length>0)for(i=0;i<n.Nodes.length;i++)PerformLayoutH(n.Nodes[i]);!n.Collapsed&&n.Nodes&&n.Nodes.length>0?(h=n.Nodes[n.Nodes.length-1].Left+n.Nodes[n.Nodes.length-1].Width-n.Nodes[0].Left,t=n.Nodes[0].Left+h/2-f/2,n.LeftNode&&n.LeftNode.Left+n.LeftNode.Width+e>t&&(s=n.LeftNode.Left+n.LeftNode.Width+e,c=s-t,MoveRigth(n.Nodes,c),t=s)):n.LeftNode&&(t=n.LeftNode.Left+n.LeftNode.Width+e),n.Left=t,n.Top=l*(n.Level+1)+o*(n.Level+1),n.Height=o,n.Width=f,r=t+f/2,u=n.Top+o,n.ChildrenConnectorPoint={X:r,Y:u,Layout:"Horizontal"},r=t+f/2,u=n.Top,n.ParentConnectorPoint={X:r,Y:u,Layout:"Horizontal"}}function MoveRigth(n,t){for(var i=0;i<n.length;i++)n[i].Left+=t,n[i].ParentConnectorPoint&&(n[i].ParentConnectorPoint.X+=t),n[i].ChildrenConnectorPoint&&(n[i].ChildrenConnectorPoint.X+=t),n[i].Nodes&&MoveRigth(n[i].Nodes,t)}function MoveBottom(n,t){for(var i=0;i<n.length;i++)n[i].Top+=t,n[i].ParentConnectorPoint&&(n[i].ParentConnectorPoint.Y+=t),n[i].ChildrenConnectorPoint&&(n[i].ChildrenConnectorPoint.Y+=t),n[i].Nodes&&MoveBottom(n[i].Nodes,t)}function PrepareNode(n,t,i,r,u){var f,e;t==undefined&&(t=0),i==undefined&&(i=null),r==undefined&&(r=null),u==undefined&&(u=[]),n.Level=t,n.ParentNode=i,n.LeftNode=r;if(!n.Collapsed&&n.Nodes&&n.Nodes.length>0)for(f=0;f<n.Nodes.length;f++)e=null,f==0&&u[t]!=undefined&&(e=u[t]),f>0&&(e=n.Nodes[f-1]),f==n.Nodes.length-1&&(u[t]=n.Nodes[f]),PrepareNode(n.Nodes[f],t+1,n,e,u)}
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

var rootNode = { Content: 'SISTEMAS', Nodes: [] }
rootNode.Nodes[0] = { Content: '1º', Nodes: [], Collapsed: true }
rootNode.Nodes[0].Nodes[0] = { Content: 'Lunes', Nodes: [], Collapsed: true }
rootNode.Nodes[0].Nodes[1] = { Content: 'Martes', Nodes: [], Collapsed: true }
rootNode.Nodes[0].Nodes[2] = { Content: 'Viernes', Nodes: [], Collapsed: true }
rootNode.Nodes[0].Nodes[0].Nodes[0] = { Content: 'Matemática Discreta' }
rootNode.Nodes[0].Nodes[1].Nodes[0] = { Content: 'Algoritmos y Estructuras de Datos' }
rootNode.Nodes[0].Nodes[2].Nodes[0] = { Content: 'Arquitectura de Computadoras' }
rootNode.Nodes[0].Nodes[2].Nodes[1] = { Content: 'Sistemas y Organizaciones' }
rootNode.Nodes[1] = { Content: '2º', Nodes: [], Collapsed: true }
rootNode.Nodes[1].Nodes[0] = { Content: 'Miércoles', Nodes: [], Collapsed: true }
rootNode.Nodes[1].Nodes[1] = { Content: 'Jueves', Nodes: [], Collapsed: true }
rootNode.Nodes[1].Nodes[0].Nodes[0] = { Content: 'Sintaxis y Semántica de los Lenguajes' }
rootNode.Nodes[1].Nodes[0].Nodes[1] = { Content: 'Paradigmas de Programación' }
rootNode.Nodes[1].Nodes[0].Nodes[2] = { Content: 'Sistemas Operativos' }
rootNode.Nodes[1].Nodes[1].Nodes[0] = { Content: 'Análisis de Sistemas' }
rootNode.Nodes[1].Nodes[1].Nodes[1] = { Content: 'Sistemas de Representación' }
rootNode.Nodes[2] = { Content: '3º', Nodes: [], Collapsed: true }
rootNode.Nodes[2].Nodes[0] = { Content: 'Lunes', Nodes: [], Collapsed: true }
rootNode.Nodes[2].Nodes[1] = { Content: 'Martes', Nodes: [], Collapsed: true }
rootNode.Nodes[2].Nodes[2] = { Content: 'Miércoles', Nodes: [], Collapsed: true }
rootNode.Nodes[2].Nodes[3] = { Content: 'Jueves', Nodes: [], Collapsed: true }
rootNode.Nodes[2].Nodes[0].Nodes[0] = { Content: 'Gestión de Datos' }
rootNode.Nodes[2].Nodes[0].Nodes[1] = { Content: 'Base de Datos Avanzada(Elec.)' }
rootNode.Nodes[2].Nodes[1].Nodes[0] = { Content: 'Administración de Proyectos (Elec.)' }
rootNode.Nodes[2].Nodes[2].Nodes[0] = { Content: 'Matemática Superior' }
rootNode.Nodes[2].Nodes[3].Nodes[0] = { Content: 'Comunicaciones' }
rootNode.Nodes[2].Nodes[3].Nodes[1] = { Content: 'Modelado de procesos de Negocios(Elec.)' }
rootNode.Nodes[2].Nodes[3].Nodes[2] = { Content: 'Diseño de Sistemas' }
rootNode.Nodes[3] = { Content: '4º', Nodes: [], Collapsed: true }
rootNode.Nodes[3].Nodes[0] = { Content: 'Lunes', Nodes: [], Collapsed: true }
rootNode.Nodes[3].Nodes[1] = { Content: 'Martes', Nodes: [], Collapsed: true }
rootNode.Nodes[3].Nodes[2] = { Content: 'Miércoles', Nodes: [], Collapsed: true }
rootNode.Nodes[3].Nodes[3] = { Content: 'Jueves', Nodes: [], Collapsed: true }
rootNode.Nodes[3].Nodes[0].Nodes[0] = { Content: 'Programación Avanzada(Elec.)' }
rootNode.Nodes[3].Nodes[0].Nodes[1] = { Content: 'Redes de Información' }
rootNode.Nodes[3].Nodes[0].Nodes[2] = { Content: 'Habilitación Profesional' }
rootNode.Nodes[3].Nodes[0].Nodes[3] = { Content: 'Ingeniería de Software' }
rootNode.Nodes[3].Nodes[0].Nodes[4] = { Content: 'Informática Industrial(Elec.)' }
rootNode.Nodes[3].Nodes[0].Nodes[5] = { Content: 'Investigación Operativa' }
rootNode.Nodes[3].Nodes[1].Nodes[0] = { Content: 'Informática Forense(Elec.)' }
rootNode.Nodes[3].Nodes[1].Nodes[1] = { Content: 'Computación Paralela(Elec.)' }
rootNode.Nodes[3].Nodes[1].Nodes[2] = { Content: 'Simulación' }
rootNode.Nodes[3].Nodes[2].Nodes[0] = { Content: 'Teoría de Control' }
rootNode.Nodes[3].Nodes[2].Nodes[1] = { Content: 'Sistemas de Gestión' }
rootNode.Nodes[3].Nodes[3].Nodes[0] = { Content: 'Administración de Recursos' }
rootNode.Nodes[4] = { Content: '5º', Nodes: [], Collapsed: true }
rootNode.Nodes[4].Nodes[0] = { Content: 'Lunes', Nodes: [], Collapsed: true }
rootNode.Nodes[4].Nodes[1] = { Content: 'Martes', Nodes: [], Collapsed: true }
rootNode.Nodes[4].Nodes[2] = { Content: 'Miércoles', Nodes: [], Collapsed: true }
rootNode.Nodes[4].Nodes[3] = { Content: 'Jueves', Nodes: [], Collapsed: true }
rootNode.Nodes[4].Nodes[0].Nodes[0] = { Content: 'Proyecto Final' }
rootNode.Nodes[4].Nodes[0].Nodes[1] = { Content: 'Inteligencia Artificial' }
rootNode.Nodes[4].Nodes[0].Nodes[2] = { Content: 'Aseguramiento de la Calidad del Software(Elec.)' }
rootNode.Nodes[4].Nodes[0].Nodes[3] = { Content: 'Sistemas de Transmisión de Datos(Elec.)' }
rootNode.Nodes[4].Nodes[1].Nodes[0] = { Content: 'Organización Industrial y Empresarial(Elec.)' }
rootNode.Nodes[4].Nodes[2].Nodes[0] = { Content: 'Administración Gerencial' }
rootNode.Nodes[4].Nodes[2].Nodes[1] = { Content: 'Sistemas de Gestión II' }
rootNode.Nodes[4].Nodes[2].Nodes[2] = { Content: 'Comportamiento Organizacional(Elec.)' }
rootNode.Nodes[4].Nodes[2].Nodes[3] = { Content: 'Administración de Sistemas Operativos de Red(Elec.)' }
rootNode.Nodes[4].Nodes[3].Nodes[0] = { Content: 'Taller de Programación Avanzada(Elec.)' }
rootNode.Nodes[4].Nodes[3].Nodes[1] = { Content: 'Seguridad en Redes(Elec.)' }
rootNode.Nodes[4].Nodes[3].Nodes[2] = { Content: 'Gobierno Electrónico(Elec.)' }
rootNode.Nodes[4].Nodes[3].Nodes[3] = { Content: 'Desarrollo de Software dirigido por Modelos(Elec.)' }
rootNode.Nodes[4].Nodes[3].Nodes[4] = { Content: 'Taller de Informática Forense(Elec.)' }
rootNode.Nodes[4].Nodes[3].Nodes[5] = { Content: 'Nuevas Tecnologías de Redes(Elec.)' }
rootNode.Nodes[5] = { Content: 'Sin año', Nodes: [], Collapsed: true }
rootNode.Nodes[5].Nodes[0] = { Content: 'Lunes', Nodes: [], Collapsed: true }
rootNode.Nodes[5].Nodes[1] = { Content: 'Martes', Nodes: [], Collapsed: true }
rootNode.Nodes[5].Nodes[0].Nodes[0] = { Content: 'Práctica Supervisada' }
rootNode.Nodes[5].Nodes[1].Nodes[0] = { Content: 'Modelos Probabilísticos Gráficos(Elec.)' }
rootNode.Nodes[5].Nodes[1].Nodes[1] = { Content: 'Aprendizaje de Máquinas(Elec.)' }
