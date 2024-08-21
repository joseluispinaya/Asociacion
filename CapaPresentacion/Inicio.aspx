<%@ Page Title="" Language="C#" MasterPageFile="~/Pagina.Master" AutoEventWireup="true" CodeBehind="Inicio.aspx.cs" Inherits="CapaPresentacion.Inicio" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <ol class="breadcrumb float-xl-end">
        <li class="breadcrumb-item"><a href="javascript:;">Inicio</a></li>
        <li class="breadcrumb-item active">Panel de Inicio</li>
    </ol>
    <h1 class="page-header">Panel de Inicio <small>de Asociacion...</small></h1>

    <div class="row">
        <div class="col-xl-12">
            <div class="mb-10px fs-10px mt-20px"><b class="text-dark">BIENVENIDO</b></div>
            <!-- BEGIN card-group -->
            <div class="card-group">
                <!-- BEGIN card -->
                <div class="card">
                    <img class="card-img-top" src="assetsbs/img/post/post-1.jpg" alt="Card image cap" />
                    <div class="card-body">
                        <h4 class="card-title">Capacitacion</h4>
                        <p class="card-text">Capacitacion y apoyo por tecnicos de la direccion de desarrollo productivo y artesania</p>
                        <%--<p class="card-text text-gray">Last updated 3 mins ago</p>--%>
                    </div>
                </div>
                <!-- END card -->
                <!-- BEGIN card -->
                <div class="card">
                    <img class="card-img-top" src="assetsbs/img/post/post-2.jpg" alt="Card image cap" />
                    <div class="card-body">
                        <h4 class="card-title">Prevencion</h4>
                        <p class="card-text">Tecnicas de prevencion por la direccion de desarrollo productivo y artesania.</p>
                        <%--<p class="card-text text-gray">Last updated 3 mins ago</p>--%>
                    </div>
                </div>
                <!-- END card -->
                <!-- BEGIN card -->
                <div class="card">
                    <img class="card-img-top" src="assetsbs/img/post/post-3.jpg" alt="Card image cap" />
                    <div class="card-body">
                        <h4 class="card-title">Coordinacion</h4>
                        <p class="card-text">Reunion entre agricultores y la direccion de desarrollo productivo y artesania.</p>
                        <%--<p class="card-text text-gray">Last updated 3 mins ago</p>--%>
                    </div>
                </div>
                <!-- END card -->
                <!-- BEGIN card -->
                <div class="card">
                    <img class="card-img-top" src="assetsbs/img/post/post-4.jpg" alt="Card image cap" />
                    <div class="card-body">
                        <h4 class="card-title">Apoyo productivo</h4>
                        <p class="card-text">Apoyo productivo a distintos agricultores por la direccion de desarrollo productivo y artesania.</p>
                        <%--<p class="card-text text-gray">Last updated 3 mins ago</p>--%>
                    </div>
                </div>
                <!-- END card -->
            </div>
            <!-- END card-group -->
        </div>
    </div>

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="assets/plugins/masonry-layout/masonry.pkgd.min.js"></script>
</asp:Content>
