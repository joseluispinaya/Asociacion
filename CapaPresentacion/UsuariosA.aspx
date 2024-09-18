<%@ Page Title="" Language="C#" MasterPageFile="~/Pagina.Master" AutoEventWireup="true" CodeBehind="UsuariosA.aspx.cs" Inherits="CapaPresentacion.UsuariosA" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <%--<link href="assets/plugins/toastr/toastr.min.css" rel="stylesheet" />--%>
    <style>
        .buttons-excel {
            color: #fff !important;
            background-color: #28a745 !important;
            border-color: #28a745 !important;
        }
        .dt-buttons {
            float: left;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <h1 class="page-header">Usuarios <small>...</small></h1>

    <%--<div class="row mb-3">
    <div class="col-xl-6">
        <div class="panel panel-inverse" data-sortable-id="form-stuff-1">
            <div class="panel-heading">
                <h4 class="panel-title">Form Controls</h4>
                <div class="panel-heading-btn">
                    <a href="javascript:;" class="btn btn-xs btn-icon btn-warning" data-toggle="panel-collapse"><i class="fa fa-minus"></i></a>
                </div>
            </div>

            <div class="panel-body">
                <div class="row mb-15px">
                    <label class="form-label col-form-label col-md-3">Email address</label>
                    <div class="col-md-9">
                        <input type="email" class="form-control mb-5px" placeholder="Enter email" />
                        <small class="fs-12px text-gray-500-darker">We'll never share your email with anyone else.</small>
                    </div>
                </div>
                <div class="row mb-15px">
                    <label class="form-label col-form-label col-md-3">Example select</label>
                    <div class="col-md-9">
                        <select class="form-select">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </div>
                </div>
                <div class="row mb-15px">
                    <label class="form-label col-form-label col-md-3">Example File Input</label>
                    <div class="col-md-9">
                        <input class="form-control" type="file" id="formFile" />
                    </div>
                </div>
            </div>
        </div>
        
    </div>

        <div class="col-xl-6">
            <div class="panel panel-inverse" data-sortable-id="form-stuff-11">
                <div class="panel-heading">
                    <h4 class="panel-title">Default Style</h4>
                    <div class="panel-heading-btn">
                        <a href="javascript:;" class="btn btn-xs btn-icon btn-warning" data-toggle="panel-collapse"><i class="fa fa-minus"></i></a>
                    </div>
                </div>

                <div class="panel-body">
                    <fieldset>
                        <legend class="mb-3">Legend</legend>
                        <div class="mb-3">
                            <label class="form-label" for="exampleInputEmail1">Email address</label>
                            <input class="form-control" type="email" id="exampleInputEmail1" placeholder="Enter email" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label" for="exampleInputPassword1">Password</label>
                            <input class="form-control" type="password" id="exampleInputPassword1" placeholder="Password" />
                        </div>
                        <div class="form-check mb-3">
                            <input class="form-check-input" type="checkbox" id="nf_checkbox_css_1" />
                            <label class="form-check-label" for="nf_checkbox_css_1">Check me out</label>
                        </div>
                        <button id="btnGuardarCambios" type="button" class="btn btn-primary w-100px me-5px">Login</button>
                        <button type="button" class="btn btn-default w-100px">Cancel</button>
                    </fieldset>
                </div>
            </div>
        </div>
</div>--%>

    <div class="panel panel-inverse">
        <div class="panel-heading">
            <h4 class="panel-title">Panel de Usuario</h4>
            <div class="panel-heading-btn">
                
                <a href="javascript:;" class="btn btn-xs btn-icon btn-warning" data-toggle="panel-collapse"><i class="fa fa-minus"></i></a>
            </div>
        </div>
        <div class="panel-body">
            <!-- BEGIN <div class="row row-cols-lg-auto g-3 mb-3"> -->
            <div class="row">
                <div class="col-xl-12 text-center">
                    <a href="#" id="btnNuevo" class="btn btn-lime"><i class="fas fa-pencil me-2"></i>Nuevo</a>
                </div>
            </div>
            <table id="tbUsuario" width="100%" class="table table-striped table-bordered align-middle text-nowrap">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Imagen</th>
                        <th>Cargo</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Correo</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>


    <div class="modal fade" id="modal-dialog" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Detalle Usuario</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
                </div>
                <div class="modal-body">
                    <%--<fieldset>
                        
                    </fieldset>--%>
                    <input id="txtIdUsuario" class="model" name="IdUsuario" value="0" type="hidden" />
                        <div class="row">
                            <div class="col-xl-6">
                                <div class="row">
                                    <div class="col-xl-6">
                                        <div class="mb-3">
                                            <label class="form-label" for="txtNombre">Nombre</label>
                                            <input class="form-control model" type="text" id="txtNombre" placeholder="Nombres" name="Nombres" />
                                        </div>

                                        <div class="mb-3">
                                            <label class="form-label" for="txtNroci">Nro CI</label>
                                            <input class="form-control model" type="text" id="txtNroci" placeholder="Nro CI" name="Nro CI" />
                                        </div>

                                        <div class="mb-3">
                                            <label class="form-label" for="txtclave">Contraseña</label>
                                            <input class="form-control model" type="text" id="txtclave" placeholder="Contraseña" name="Contraseña" />
                                        </div>
                                    </div>
                                    <div class="col-xl-6">
                                        <div class="mb-3">
                                            <label class="form-label" for="txtApellidos">Apellidos</label>
                                            <input class="form-control model" type="text" id="txtApellidos" placeholder="Apellidos" name="Apellidos" />
                                        </div>

                                        <div class="mb-3">
                                            <label class="form-label" for="txtCorreo">Correo</label>
                                            <input class="form-control model" type="text" id="txtCorreo" placeholder="Correo" name="Correo" />
                                        </div>

                                        <div class="mb-3">
                                            <label class="form-label" for="cboRol">Tipo Usuario</label>
                                            <select class="form-select" id="cboRol">
                                            </select>
                                        </div>
                                    </div>

                                    <div class="col-12 d-flex justify-content-center">
                                        <div class="mb-3 w-50">
                                            <label class="form-label" for="cboEstado">Estado</label>
                                            <select class="form-select" id="cboEstado">
                                                <option value="1">Activo</option>
                                                <option value="0">No Activo</option>
                                            </select>
                                        </div>
                                    </div>

                                </div>

                            </div>
                            <div class="col-xl-6">
                                <div class="mb-2">
                                    <p class="mb-0">Debe seleccionar una foto</p>
                                </div>

                                <div class="mb-3">
                                    <input class="form-control" type="file" id="txtFotoS" />
                                </div>

                                <div class="mb-3 text-center">
                                    <img id="imgUsuarioM" src="Imagenes/sinimagen.png" alt="Foto usuario" style="height: 130px; max-width: 130px; border-radius: 50%;">
                                </div>
                            </div>
                        </div>
                </div>
                <div class="modal-footer">
                    <a href="javascript:;" class="btn btn-white" data-bs-dismiss="modal">Cancelar</a>
                    <button id="btnGuardarCambios" type="button" class="btn btn-success">Guardar Cambios</button>
                    <%--<a href="javascript:;" class="btn btn-success">Guardar Cambios</a>--%>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <%--<script src="assets/plugins/toastr/toastr.min.js"></script>--%>
    <script src="assets/plugins/sweetalert/sweetalert.min.js"></script>
    <%--<script src="assets/plugins/loadingoverlay/loadingoverlay.js"></script>--%>

    <script src="js/UsuariosA.js" type="text/javascript"></script>
</asp:Content>
