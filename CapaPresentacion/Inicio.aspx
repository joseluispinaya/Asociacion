<%@ Page Title="" Language="C#" MasterPageFile="~/Pagina.Master" AutoEventWireup="true" CodeBehind="Inicio.aspx.cs" Inherits="CapaPresentacion.Inicio" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <ol class="breadcrumb float-xl-end">
        <li class="breadcrumb-item"><a href="javascript:;">Home</a></li>
        <li class="breadcrumb-item active">Panel de Inicio</li>
    </ol>
    <h1 class="page-header">Panel de Inicio <small>de Asociacion...</small></h1>

    <div class="row">
        <div class="col-xl-12">
            <div class="mb-10px fs-10px mt-20px"><b class="text-dark">CARD GROUPS</b></div>
            <!-- BEGIN card-group -->
            <div class="card-group">
                <!-- BEGIN card -->
                <div class="card">
                    <img class="card-img-top" src="assets/img/gallery/gallery-6.jpg" alt="Card image cap" />
                    <div class="card-body">
                        <h4 class="card-title">Card title</h4>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p class="card-text text-gray">Last updated 3 mins ago</p>
                    </div>
                </div>
                <!-- END card -->
                <!-- BEGIN card -->
                <div class="card">
                    <img class="card-img-top" src="assets/img/gallery/gallery-7.jpg" alt="Card image cap" />
                    <div class="card-body">
                        <h4 class="card-title">Card title</h4>
                        <p class="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                        <p class="card-text text-gray">Last updated 3 mins ago</p>
                    </div>
                </div>
                <!-- END card -->
                <!-- BEGIN card -->
                <div class="card">
                    <img class="card-img-top" src="assets/img/gallery/gallery-8.jpg" alt="Card image cap" />
                    <div class="card-body">
                        <h4 class="card-title">Card title</h4>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p class="card-text text-gray">Last updated 3 mins ago</p>
                    </div>
                </div>
                <!-- END card -->
                <!-- BEGIN card -->
                <div class="card">
                    <img class="card-img-top" src="assets/img/gallery/gallery-9.jpg" alt="Card image cap" />
                    <div class="card-body">
                        <h4 class="card-title">Card title</h4>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
                        <p class="card-text text-gray">Last updated 3 mins ago</p>
                    </div>
                </div>
                <!-- END card -->
            </div>
            <!-- END card-group -->
        </div>
    </div>

    <%--<div class="panel panel-inverse">
        <div class="panel-heading">
            <h4 class="panel-title">Panel Title here</h4>
            <div class="panel-heading-btn">
                
                <a href="javascript:;" class="btn btn-xs btn-icon btn-warning" data-toggle="panel-collapse"><i class="fa fa-minus"></i></a>
            </div>
        </div>
        <div class="panel-body">
            Panel Content Here
        </div>
    </div>--%>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="assets/plugins/masonry-layout/masonry.pkgd.min.js"></script>
</asp:Content>
